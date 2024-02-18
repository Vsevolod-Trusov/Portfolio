#include "Addictions.h"
#include "MFST.h"

int FST_TRACE_n = -1;

MFST::MfstState::MfstState()
{
	tape_position = 0;
	nrule = -1;
	nrulechain = -1;
}

MFST::MfstState::MfstState(short position, MFSTSTACK pst, short pnrulechain)
{
	tape_position = position;
	nrule = -1;
	nrulechain = pnrulechain;
	st = pst;
}

MFST::MfstState::MfstState(short pposition, MFSTSTACK pst, short pnrule, short pnrulechain)
{
	tape_position = pposition;
	nrule = pnrule;
	nrulechain = pnrulechain;
	st = pst;
}

MFST::Mfst::MfstDiagnosis::MfstDiagnosis()
{
	tape_position = -1;
	rc_step = RC_STEP::SURPRISE;
	nrule = -1;
	nrule_chain = -1;
}

MFST::Mfst::MfstDiagnosis::MfstDiagnosis(short ptape_position, RC_STEP prc_step, short pnrule, short pnrule_chain)
{
	tape_position = ptape_position;
	rc_step = prc_step;
	nrule = pnrule;
	nrule_chain = pnrule_chain;
}

MFST::Mfst::Mfst()
{
	tape = 0;
	tape_size = 0;
	tape_position = 0;
	LT::LexTable lex(LT::Create(0));
	nrule = -1;
	nrulechain = -1;
}

MFST::Mfst::Mfst(LT::LexTable plextable, GRB::Greibach pgreibach, bool flag/*std::string pfile*/)
{
	lex = plextable;
	greibach = pgreibach;
	tape_position = 0;
	nrule = -1;
	nrulechain = -1;
	tape_size = plextable.size;
	flag_out = flag;//новое;
	tape = DBG_NEW short[tape_size];
	
	if(!flag)
		printTrace.open("MFST.txt"/*pfile*/);

	for (int k = 0; k < tape_size; ++k) {
		tape[k] = GRB::TS(lex.table[k].lexema);
	}

	st.push(greibach.stbottomT);
	st.push(greibach.startN);
}

std::string MFST::Mfst::getCSt() {
	std::string output = "";

	for (int k = (signed)st.size() - 1; k >= 0; --k) {
		short p = st.c[k];
		output.push_back(GRB::Rule::Chain::alphabet_to_char(p));
	}

	return output;
}

std::string MFST::Mfst::getCTape(short pos, short n) {
	std::string output = "";
	short i;
	short k = (pos + n < tape_size) ? pos + n : tape_size;

	for (i = pos; i < k; ++i) {
		output.push_back(GRB::Rule::Chain::alphabet_to_char(tape[i]));
	}

	return output;
}

std::string MFST::Mfst::getDiagnosis(short n) {
	std::string output = "";
	std::stringstream ss;
	int errid = 0;
	int lpos = -1;

	if (n < MFST_DIAGN_NUMBER && (lpos = diagnosis[n].tape_position) >= 0) {
		errid = greibach.getRule(diagnosis[n].nrule).iderror;
		Error::ERROR err = Error::geterror(errid);
		ss << err.id << ": строка " << lex.table[lpos].sn << "," << err.message;
		output = ss.str();
	}

	return output;
}

bool MFST::Mfst::save_state() {
	storestate.push(MfstState(tape_position, st, nrule, nrulechain));
	if (!flag_out)
	{
		MFST_TRACE6("SAVESTATE:", storestate.size());
	}
	else
	{
		MFST_TRACE62("SAVESTATE:", storestate.size());
	}
	return true;
}

bool MFST::Mfst::restore_state() {
	bool output = false;
	MfstState state;

	if (output = (storestate.size() > 0)) {
		state = storestate.top();
		tape_position = state.tape_position;
		st = state.st;
		nrule = state.nrule;
		nrulechain = state.nrulechain;
		storestate.pop();
		if (!flag_out)
		{
			MFST_TRACE5("RESTORESTATE")
		}
		else
		{
			MFST_TRACE52("RESTORESTATE")
		}
			if (!flag_out)
			{
				MFST_TRACE2
			}
			else
			{
				MFST_TRACE22
			}
			
	}

	return output;
}

bool MFST::Mfst::push_chain(GRB::Rule::Chain chain) {
	for (int k = chain.size - 1; k >= 0; k--) {
		st.push(chain.nt[k]);
	}

	return true;
}

MFST::Mfst::RC_STEP MFST::Mfst::step() {
	RC_STEP output = Mfst::RC_STEP::SURPRISE;
	if (tape_position < tape_size) {
		if (GRB::Rule::Chain::isN(st.top())) {
			GRB::Rule rule;
			if ((nrule = greibach.getRule(st.top(), rule)) >= 0) {
				GRB::Rule::Chain chain;
				if ((nrulechain = rule.getNextChain(tape[tape_position], chain, nrulechain + 1)) >= 0) {
					if (!flag_out)
					{
						MFST_TRACE1
					}
					else
					{
						MFST_TRACE12
					}
							save_state();
					st.pop();
					push_chain(chain);
					output = Mfst::RC_STEP::NS_OK;
					if (!flag_out)
					{
						MFST_TRACE2
					}
					else
					{
						MFST_TRACE22
					}
				}
				else {
					if (!flag_out)
					{
						MFST_TRACE4("TNS_NORULECHAIN/NS_NORULE")
					}
					else
					{
						MFST_TRACE42("TNS_NORULECHAIN/NS_NORULE")
					}
						savediagnosis(Mfst::RC_STEP::NS_NORULECHAIN);
					output = restore_state() ? Mfst::RC_STEP::NS_NORULECHAIN : Mfst::RC_STEP::NS_NORULE;
				};
			}
			else
				output = Mfst::RC_STEP::NS_ERROR;
		}
		else if ((st.top() == tape[tape_position])) {
			tape_position++;
			st.pop();
			nrulechain = -1;
			output = Mfst::RC_STEP::TS_OK;
			if (!flag_out)
			{
				MFST_TRACE3
			}
			else
			{
				MFST_TRACE32
			}
		}
		else {
			if (!flag_out)
			{
				MFST_TRACE4("TS_NOK/NS_NORULECHAIN")
			}
			else
			{
				MFST_TRACE42("TS_NOK/NS_NORULECHAIN")
			}
				output = restore_state()
				? Mfst::RC_STEP::TS_NOK : Mfst::RC_STEP::NS_NORULECHAIN;
		}
	}
	else {
		output = Mfst::RC_STEP::TAPE_END;
		if (!flag_out)
		{
			MFST_TRACE4("TAPE_END")
		}
		else
		{
			MFST_TRACE42("TAPE_END")
		}
	};
	return output;
}

bool MFST::Mfst::start(std::ostream& outputStream) {
	
	if (!flag_out)
	{
		MFST_TRACE_START;
	}
	else
	{
		MFST_TRACE_START2;			//новое
	}
	bool output = false;
	RC_STEP rc_step = RC_STEP::SURPRISE;

	do {
		rc_step = step();
	} while (rc_step == Mfst::RC_STEP::NS_OK || rc_step == Mfst::RC_STEP::NS_NORULECHAIN
		|| rc_step == Mfst::RC_STEP::TS_OK || rc_step == Mfst::RC_STEP::TS_NOK);

	switch (rc_step) {
	case Mfst::RC_STEP::TAPE_END:
		if (!flag_out)
		{
			MFST_TRACE4("------>TAPE_END\n\n\n");
			outputStream << "" << std::endl;
			outputStream << "  ==============############   Синтаксический анализ выполнен без ошибок   ############==============\n";
			outputStream << "" << std::endl;
		}
		else
		{
			MFST_TRACE42("------>TAPE_END\n\n\n");
			cout << "" << std::endl;
			cout << "  ==============############   Синтаксический анализ выполнен без ошибок   ############==============\n";
			cout << "" << std::endl;
		}
		output = true;
		break;

	case Mfst::RC_STEP::NS_NORULE:
		
		if (!flag_out)
		{
			MFST_TRACE4("------>NS_NORULE");
			outputStream << "-------------------------------------------------------------------------------------" << std::endl;
			outputStream << getDiagnosis(0) << std::endl;
		}
		else
		{
			MFST_TRACE42("------>NS_NORULE");
			cout << "-------------------------------------------------------------------------------------" << std::endl;
			cout << getDiagnosis(0) << std::endl;
		}
		break;

	case Mfst::RC_STEP::NS_NORULECHAIN:
		if (!flag_out)
		{
			MFST_TRACE4("------>NS_NORULECHAIN");
		}
		else
		{
			MFST_TRACE42("------>NS_NORULECHAIN");
		}
		break;

	case Mfst::RC_STEP::NS_ERROR:
		if (!flag_out)
		{
			MFST_TRACE4("------>NS_ERROR");
		}
		else
		{
			MFST_TRACE42("------>NS_ERROR");
		}
		break;

	case Mfst::RC_STEP::SURPRISE:
		if (!flag_out)
		{
			MFST_TRACE4("------>SURPRISE");
		}
		else
		{
			MFST_TRACE42("------>SURPRISE");
		}
		break;
	}
	return output;
}

bool MFST::Mfst::savediagnosis(RC_STEP rc_step) {
	bool output = false;
	short k = 0;

	while (k < MFST_DIAGN_NUMBER && tape_position <= diagnosis[k].tape_position)
		k++;

	if (output = (k < MFST_DIAGN_NUMBER)) {
		diagnosis[k] = MfstDiagnosis(tape_position, rc_step, nrule, nrulechain);
		for (short j = k + 1; j < MFST_DIAGN_NUMBER; ++j) {
			diagnosis[j].tape_position = -1;
		}
	}

	return output;
}

void MFST::Mfst::printrules() {
	MfstState state;
	GRB::Rule rule;
	for (unsigned short k = 0; k < storestate.size(); k++)
	{
		state = storestate.c[k];
		rule = greibach.getRule(state.nrule);
		if (!flag_out)
		{
			MFST_TRACE7
		}
		else
		{
			MFST_TRACE72
		}
	}
}

bool MFST::Mfst::save_dedication() {
	MfstState state;
	GRB::Rule rule;
	dedication.size = (short)storestate.size();
	dedication.nrules = DBG_NEW short[dedication.size];
	dedication.nrulechains = DBG_NEW short[dedication.size];
	for (unsigned short k = 0; k < storestate.size(); k++)
	{
		state = storestate.c[k];
		dedication.nrules[k] = state.nrule;
		dedication.nrulechains[k] = state.nrulechain;
	};
	return true;
}

MFST::Mfst::Dedication::Dedication()
{
	size = 0;
	nrules = nullptr;
	nrulechains = nullptr;
}