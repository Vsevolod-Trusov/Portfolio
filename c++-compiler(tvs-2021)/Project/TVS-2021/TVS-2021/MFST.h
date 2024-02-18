#pragma once
#include <stack>
#include "Greibach.h"
#include "LT.h"
#include "Errors.h"
#include "Parm.h"

#define MFST_DIAGN_MAXSIZE 2*ERROR_MAXSIZE_MESSAGE
#define MFST_DIAGN_NUMBER 3

#define MFST_TRACE_START printTrace << std::setw(4)<<std::left<<"Шаг"<<": " \
	<< std::setw(30) << std::left << "Правило"  \
	<< std::setw(30) << std::left << "Входная лента" \
	<< std::setw(20) << std::left << "Стек" \
	<< std::endl;

#define MFST_TRACE1 printTrace <<std::setw(4)<<std::left<<++FST_TRACE_n<<": " \
	<< std::setw(30) << std::left << rule.getCRule(nrulechain)  \
	<< std::setw(30) << std::left << getCTape(tape_position) \
	<< std::setw(20) << std::left << getCSt() \
	<< std::endl;

#define MFST_TRACE2    printTrace <<std::setw(4)<<std::left<<FST_TRACE_n<<": " \
	<< std::setw(30) << std::left << " "  \
	<< std::setw(30) << std::left << getCTape(tape_position) \
	<< std::setw(20) << std::left << getCSt() \
	<< std::endl;

#define MFST_TRACE3     printTrace<<std::setw(4)<<std::left<<++FST_TRACE_n<<": " \
	<< std::setw(30) << std::left << " "  \
	<< std::setw(30) << std::left << getCTape(tape_position) \
	<< std::setw(20) << std::left << getCSt() \
	<< std::endl;

#define MFST_TRACE4(c) printTrace<<std::setw(4)<<std::left<<++FST_TRACE_n<<": "<<std::setw(20)<<std::left<<c<<std::endl;
#define MFST_TRACE5(c) printTrace<<std::setw(4)<<std::left<<  FST_TRACE_n<<": "<<std::setw(20)<<std::left<<c<<std::endl;

#define MFST_TRACE6(c,k) printTrace<<std::setw(4)<<std::left<<++FST_TRACE_n<<": "<<std::setw(20)<<std::left<<c<<k<<std::endl;

#define MFST_TRACE7  printTrace<<std::setw(4)<<std::left<<state.tape_position<<": "\
	<< std::setw(20) << std::left << rule.getCRule(state.nrulechain) \
	<< std::endl;



#define MFST_TRACE_START2 cout << std::setw(4)<<std::setfill(' ')<<std::left<<"Шаг"<<": " \
	<< std::setw(30)<<std::setfill(' ')<< std::left << "Правило"  \
	<< std::setw(30)<<std::setfill(' ')<< std::left << "Входная лента" \
	<< std::setw(20)<<std::setfill(' ')<< std::left << "Стек" \
	<< std::endl;

#define MFST_TRACE12 cout <<std::setw(4)<<std::setfill(' ')<<std::left<<++FST_TRACE_n<<": " \
	<< std::setw(30)<<std::setfill(' ') << std::left << rule.getCRule(nrulechain)  \
	<< std::setw(30)<<std::setfill(' ') << std::left << getCTape(tape_position) \
	<< std::setw(20)<<std::setfill(' ') << std::left << getCSt() \
	<< std::endl;

#define MFST_TRACE22    cout <<std::setw(4)<<std::setfill(' ')<<std::left<<FST_TRACE_n<<": " \
	<< std::setw(30)<<std::setfill(' ') << std::left << " "  \
	<< std::setw(30)<<std::setfill(' ') << std::left << getCTape(tape_position) \
	<< std::setw(20)<<std::setfill(' ') << std::left << getCSt() \
	<< std::endl;

#define MFST_TRACE32     cout<<std::setw(4)<<std::setfill(' ')<<std::left<<++FST_TRACE_n<<": " \
	<< std::setw(30)<<std::setfill(' ') << std::left << " "  \
	<< std::setw(30)<<std::setfill(' ') << std::left << getCTape(tape_position) \
	<< std::setw(20)<<std::setfill(' ') << std::left << getCSt() \
	<< std::endl;

#define MFST_TRACE42(c) cout<<std::setw(4)<<std::setfill(' ')<<std::left<<++FST_TRACE_n<<": "<<std::setw(20)<<std::left<<c<<std::endl;
#define MFST_TRACE52(c) cout<<std::setw(4)<<std::setfill(' ')<<std::left<<  FST_TRACE_n<<": "<<std::setw(20)<<std::left<<c<<std::endl;

#define MFST_TRACE62(c,k) cout<<std::setw(4)<<std::setfill(' ')<<std::left<<++FST_TRACE_n<<": "<<std::setw(20)<<std::left<<c<<k<<std::endl;

#define MFST_TRACE72  cout<<std::setw(4)<<std::setfill(' ')<<std::left<<state.tape_position<<": "\
	<< std::setw(20)<<std::setfill(' ') << std::left << rule.getCRule(state.nrulechain) \
	<< std::endl;

template<typename T>
struct use_container : T
{
	using T::T;
	using T::c;
};

typedef use_container<std::stack<short>> MFSTSTACK;

namespace MFST {
	struct MfstState {
		short tape_position;
		short nrule;
		short nrulechain;
		MFSTSTACK st;

		MfstState();
		MfstState(short position, MFSTSTACK pst, short pnrulechain);
		MfstState(short pposition, MFSTSTACK pst, short pnrule, short pnrulechain);
	};


	struct Mfst {
		enum class RC_STEP {
			NS_OK,
			NS_NORULE,
			NS_NORULECHAIN,
			NS_ERROR,
			TS_OK,
			TS_NOK,
			TAPE_END,
			SURPRISE
		};

		std::ofstream printTrace;
		bool flag_out = false;

		struct MfstDiagnosis {
			short tape_position;
			RC_STEP rc_step;
			short nrule;
			short nrule_chain;

			MfstDiagnosis();
			MfstDiagnosis(short ptape_position, RC_STEP prc_step, short pnrule, short pnrule_chain);
		} diagnosis[MFST_DIAGN_NUMBER];

		GRBALPHABET* tape;
		short tape_position;
		short nrule;
		short nrulechain;
		short tape_size;
		GRB::Greibach greibach;
		LT::LexTable lex;
		MFSTSTACK st;
		use_container<std::stack<MfstState>> storestate;

		Mfst();
		Mfst(LT::LexTable plextable, GRB::Greibach pgreibach, /*std::string pfile*/bool flag);

		std::string getCSt();
		std::string getCTape(short pos, short n = 25);
		std::string getDiagnosis(short n);
		bool save_state();
		bool restore_state();
		bool push_chain(GRB::Rule::Chain chain);
		RC_STEP step();
		bool start(std::ostream& outputStream);
		bool savediagnosis(RC_STEP rc_step);
		void printrules();
		struct Dedication {
			short size;
			short* nrules;
			short* nrulechains;

			Dedication();
		} dedication;
		bool save_dedication();
	};
}