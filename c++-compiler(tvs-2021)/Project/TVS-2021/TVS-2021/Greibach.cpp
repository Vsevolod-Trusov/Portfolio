#include "Greibach.h"
#include "Addictions.h"
#define GRB_ERROR_SERIES 600

namespace GRB
{		//S-стартовый символ, N-конструкции внутри символов, E-что есть внутри выражения, M-операторы , 
		//W-идентификаторы и литералы, L- в нем лежат все бибиблеотечные функции
		//P-параметры в вызываемой функции
	const Greibach greibach(
		NS('S'), TS('$'),
		13,
		Rule(
			NS('S'), GRB_ERROR_SERIES + 0,
			6,
			Rule::Chain(9, TS('t'), TS('f'), TS('i'), TS('('), TS('t'), TS('i'), TS(')'), NS('B'), NS('S')),
			Rule::Chain(6, TS('t'), TS('f'), TS('i'), NS('F'), NS('B'), NS('S')),
			Rule::Chain(4, TS('p'), TS('{'), NS('N'), TS('}')),
			Rule::Chain(5, TS('t'), TS('f'), TS('i'), NS('F'), NS('B')),
			Rule::Chain(6, TS('t'), TS('f'), TS('i'), TS('('), TS(')'), NS('B')),
			Rule::Chain(7, TS('t'), TS('f'), TS('i'), TS('('), TS(')'), NS('B'), NS('S'))
		),
		Rule(
			NS('F'), GRB_ERROR_SERIES + 1,
			2,
			Rule::Chain(3, TS('('), NS('P'), TS(')')),
			Rule::Chain(2, TS('('), TS(')'))
		),
		Rule(
			NS('P'), GRB_ERROR_SERIES + 2,
			2,
			Rule::Chain(2, TS('t'), TS('i')),
			Rule::Chain(4, TS('t'), TS('i'), TS(','), NS('P'))
		),
		Rule(
			NS('B'), GRB_ERROR_SERIES + 3,
			3,
			Rule::Chain(6, TS('{'), NS('N'), TS('r'), NS('I'), TS(';'), TS('}')),
			Rule::Chain(5, TS('{'), TS('r'), NS('I'), TS(';'), TS('}')),
			Rule::Chain(3, TS('{'), NS('N'), TS('}'))
		),
		Rule(
			NS('I'), GRB_ERROR_SERIES + 4,
			8,
			Rule::Chain(1, TS('i')),
			Rule::Chain(1, TS('l')),
			Rule::Chain(4, TS('('),TS('v'),TS('l'), TS(')')),
			Rule::Chain(4, TS('('),TS('v'),TS('i'), TS(')')),
			Rule::Chain(2, TS('c'), NS('K')),
			Rule::Chain(2, TS('e'), NS('K')),
			Rule::Chain(2, TS('m'), NS('K')),
			Rule::Chain(2, TS('i'), NS('K'))
		),
		Rule(
			NS('U'), GRB_ERROR_SERIES + 5,
			22,
			///*Rule::Chain(3, TS('{'), NS('N'), TS('}'))*/
			Rule::Chain(5, TS('d'), TS('t'), TS('i'), TS(';'), NS('U')),
			Rule::Chain(7, TS('d'), TS('t'), TS('i'), TS('='), NS('E'), TS(';'), NS('U')),
			Rule::Chain(5, TS('i'), TS('='), NS('E'), TS(';'), NS('U')),
			Rule::Chain(4, TS('x'), NS('I'), TS(';'), NS('U')),
			Rule::Chain(4, TS('z'), NS('E'), TS(';'), NS('U')),
			Rule::Chain(4, TS('r'), NS('E'), TS(';'), NS('U')),
			Rule::Chain(4, TS('i'), NS('K'), TS(';'), NS('U')),
			Rule::Chain(4, TS('с'), NS('K'), TS(';'), NS('U')),
			Rule::Chain(4, TS('e'), NS('K'), TS(';'), NS('U')),
			Rule::Chain(4, TS('m'), NS('K'), TS(';'), NS('U')),

			Rule::Chain(4, TS('d'), TS('t'), TS('i'), TS(';')),
			Rule::Chain(6, TS('d'), TS('t'), TS('i'), TS('='), NS('E'), TS(';')),
			Rule::Chain(4, TS('i'), TS('='), NS('E'), TS(';')),
			Rule::Chain(3, TS('x'), NS('I'), TS(';')),
			Rule::Chain(3, TS('z'), NS('I'), TS(';')),
			Rule::Chain(3, TS('r'), NS('E'), TS(';')),
			Rule::Chain(3, TS('i'), NS('K'), TS(';')),
			Rule::Chain(3, TS('c'), NS('K'), TS(';')),
			Rule::Chain(3, TS('e'), NS('K'), TS(';')),
			Rule::Chain(3, TS('m'), NS('K'), TS(';')),
			Rule::Chain(8, TS('k'), TS('('), NS('R'), TS(')'), TS('{'), NS('U'), TS('}'), NS('U')),
			Rule::Chain(7, TS('k'), TS('('), NS('R'), TS(')'), TS('{'), NS('U'), TS('}'))
		),
		Rule(
			NS('N'), GRB_ERROR_SERIES + 6,
			20,
			Rule::Chain(5, TS('d'), TS('t'), TS('i'), TS(';'), NS('N')),
			Rule::Chain(7, TS('d'), TS('t'), TS('i'), TS('='), NS('E'), TS(';'), NS('N')),
			Rule::Chain(5, TS('i'), TS('='), NS('E'), TS(';'), NS('N')),
			Rule::Chain(8, TS('h'), TS('('), NS('R'), TS(')'), TS('{'), NS('U'), TS('}'), NS('N')),		
			Rule::Chain(8, TS('k'), TS('('), NS('R'), TS(')'), TS('{'), NS('X'), TS('}'), NS('N')),		
			Rule::Chain(7, TS('h'), TS('('), NS('R'), TS(')'), TS('{'), NS('U'), TS('}')),		
			Rule::Chain(7, TS('k'), TS('('), NS('R'), TS(')'), TS('{'), NS('X'), TS('}')),		
			Rule::Chain(12,TS('k'), TS('('), NS('R'), TS(')'), TS('{'), NS('X'), TS('}'), TS('j'), TS('{'), NS('X'), TS('}'), NS('N')),
			Rule::Chain(4, TS('x'), NS('I'), TS(';'), NS('N')),
			Rule::Chain(4, TS('z'), NS('I'), TS(';'), NS('N')),
			Rule::Chain(4, TS('r'), NS('E'), TS(';'), NS('N')),
			Rule::Chain(4, TS('i'), NS('K'), TS(';'), NS('N')),

			Rule::Chain(4, TS('d'), TS('t'), TS('i'), TS(';')),
			Rule::Chain(6, TS('d'), TS('t'), TS('i'), TS('='), NS('E'), TS(';')),
			Rule::Chain(4, TS('i'), TS('='), NS('E'), TS(';')),
			Rule::Chain(11, TS('k'), TS('('), NS('R'), TS(')'), TS('{'), NS('X'), TS('}'), TS('j'), TS('{'), NS('X'), TS('}')),
			Rule::Chain(3, TS('x'), NS('I'), TS(';')),
			Rule::Chain(3, TS('z'), NS('I'), TS(';')),
			Rule::Chain(3, TS('r'), NS('E'), TS(';')),
			Rule::Chain(3, TS('i'), NS('K'), TS(';'))
		),
		Rule(
			NS('R'), GRB_ERROR_SERIES + 7,
			15,
			Rule::Chain(1, TS('i')),
			Rule::Chain(1, TS('l')),
			Rule::Chain(3, TS('i'), TS('v'), TS('i')),
			Rule::Chain(3, TS('i'), TS('v'), TS('l')),
			Rule::Chain(3, TS('l'), TS('v'), TS('i')),
			Rule::Chain(4, TS('c'), NS('K'),TS('v'), TS('l')),
			Rule::Chain(4, TS('c'), NS('K'),TS('v'), TS('i')),
			Rule::Chain(4, TS('e'), NS('K'),TS('v'), TS('l')),
			Rule::Chain(4, TS('e'), NS('K'),TS('v'), TS('i')),
			Rule::Chain(2, TS('m'), NS('K')),
			Rule::Chain(4, TS('m'), NS('K'), TS('v'), TS('l')),
			Rule::Chain(4, TS('m'), NS('K'), TS('v'), TS('i')),
			Rule::Chain(2, TS('i'), NS('K')),
			Rule::Chain(4, TS('i'), NS('K'), TS('v'), TS('l')),
			Rule::Chain(4, TS('i'), NS('K'), TS('v'), TS('i'))
		),
		Rule(
			NS('K'), GRB_ERROR_SERIES + 8,
			2,
			Rule::Chain(3, TS('('), NS('W'), TS(')')),
			Rule::Chain(2, TS('('), TS('`)'))
		),
		Rule(
			NS('E'), GRB_ERROR_SERIES + 9,
			16,
			Rule::Chain(1, TS('i')),
			Rule::Chain(1, TS('l')),
			Rule::Chain(3, TS('('), NS('E'), TS(')')),
			Rule::Chain(2, TS('i'), NS('K')),
			Rule::Chain(2, TS('c'), NS('K')),
			Rule::Chain(2, TS('e'), NS('K')),
			Rule::Chain(2, TS('m'), NS('K')),
			Rule::Chain(2, TS('v'), NS('E')),

			Rule::Chain(3, TS('i'), NS('K'), NS('E')),
			Rule::Chain(3, TS('c'), NS('K'), NS('E')),
			Rule::Chain(3, TS('e'), NS('K'), NS('E')),
			Rule::Chain(3, TS('m'), NS('K'), NS('E')),
			

			Rule::Chain(2, TS('i'), NS('M')),
			Rule::Chain(2, TS('l'), NS('M')),
			Rule::Chain(4, TS('('), NS('E'), TS(')'), NS('M')),
			Rule::Chain(3, TS('i'), NS('K'), NS('M'))
		),
		Rule(
			NS('W'), GRB_ERROR_SERIES + 10,
			4,
			Rule::Chain(1, TS('i')),
			Rule::Chain(1, TS('l')),
			Rule::Chain(3, TS('i'), TS(','), NS('W')),
			Rule::Chain(3, TS('l'), TS(','), NS('W'))
		),
		Rule(
			NS('M'), GRB_ERROR_SERIES + 11,
			2,
			Rule::Chain(2, TS('v'), NS('E')),
			Rule::Chain(3, TS('v'), NS('E'), NS('M'))
		),
		Rule(
			NS('X'), GRB_ERROR_SERIES + 12,
			20,
			Rule::Chain(5, TS('d'), TS('t'), TS('i'), TS(';'), NS('X')),
			Rule::Chain(7, TS('d'), TS('t'), TS('i'), TS('='), NS('E'), TS(';'), NS('X')),
			Rule::Chain(5, TS('i'), TS('='), NS('E'), TS(';'), NS('X')),
			Rule::Chain(4, TS('x'), NS('I'), TS(';'), NS('X')),
			Rule::Chain(4, TS('z'), NS('E'), TS(';'), NS('X')),
			Rule::Chain(4, TS('r'), NS('E'), TS(';'), NS('X')),
			Rule::Chain(4, TS('i'), NS('K'), TS(';'), NS('X')),
			Rule::Chain(4, TS('с'), NS('K'), TS(';'), NS('X')),
			Rule::Chain(4, TS('e'), NS('K'), TS(';'), NS('X')),
			Rule::Chain(4, TS('m'), NS('K'), TS(';'), NS('X')),

			Rule::Chain(4, TS('d'), TS('t'), TS('i'), TS(';')),
			Rule::Chain(6, TS('d'), TS('t'), TS('i'), TS('='), NS('E'), TS(';')),
			Rule::Chain(4, TS('i'), TS('='), NS('E'), TS(';')),
			Rule::Chain(3, TS('x'), NS('I'), TS(';')),
			Rule::Chain(3, TS('z'), NS('I'), TS(';')),
			Rule::Chain(3, TS('r'), NS('E'), TS(';')),
			Rule::Chain(3, TS('i'), NS('K'), TS(';')),
			Rule::Chain(3, TS('c'), NS('K'), TS(';')),
			Rule::Chain(3, TS('e'), NS('K'), TS(';')),
			Rule::Chain(3, TS('m'), NS('K'), TS(';'))
		)
	);
	Rule::Chain::Chain()
	{
		size = 0;
		nt = nullptr;
	}
	Rule::Chain::Chain(short psize, GRBALPHABET ps, ...)
	{
		size = psize;
		nt = DBG_NEW GRBALPHABET[psize];
		int* p = (int*)&ps;
		for (short i = 0; i < psize; ++i)
		{
			nt[i] = (GRBALPHABET)p[i];
		}
	}
	Rule::Rule()
	{
		nn = 0x00;
		iderror = 0;
		size = 0;
		chains = nullptr;
	}
	Rule::Rule(GRBALPHABET pnn, int piderror, short psize, Chain pc, ...)
	{
		nn = pnn;
		iderror = piderror;
		size = psize;
		chains = DBG_NEW Chain[size];
		Chain* p = &pc;
		for (int i = 0; i < psize; ++i)
		{
			chains[i] = p[i];
		}
	}
	Greibach::Greibach()
	{
		size = 0;
		startN = 0;
		stbottomT = 0;
		rules = nullptr;
	}
	Greibach::Greibach(GRBALPHABET pstartN, GRBALPHABET pstbottomT, short psize, Rule pr, ...)
	{
		startN = pstartN;
		stbottomT = pstbottomT;
		size = psize;
		rules = DBG_NEW Rule[size];
		const Rule* p = &pr;
		for (int i = 0; i < psize; ++i)
		{
			rules[i] = p[i];
		}
	}
	std::string Rule::Chain::getCChain()
	{
		std::string chain;
		for (int i = 0; i < size; ++i)
		{
			chain.push_back(Chain::alphabet_to_char(nt[i]));
		}
		return chain;
	}
	std::string Rule::getCRule(short nchain)
	{
		std::string ruleChain(1, Chain::alphabet_to_char(nn));
		ruleChain += "->";
		ruleChain += chains[nchain].getCChain();
		return ruleChain;
	}
	short Rule::getNextChain(GRBALPHABET t, Rule::Chain& chain, short n)
	{
		short output = -1;
		while (n < size && chains[n].nt[0] != t)++n;
		output = (n < size) ? n : -1;
		if (output >= 0)
		{
			chain = chains[output];
		}
		return output;
	}
	short Greibach::getRule(GRBALPHABET pnn, Rule& prule)
	{
		short output = -1;
		short i = 0;
		while (i < size && rules[i].nn != pnn)i++;
		if (i < size)
		{
			output = i;
			prule = rules[output];
		}
		return output;
	}
	Rule Greibach::getRule(short pn)
	{
		if (pn > size)
		{
			throw ERROR_THROW(613);
		}
		return rules[pn];
	}
	const Greibach& getGreibach()
	{
		return greibach;
	}
}