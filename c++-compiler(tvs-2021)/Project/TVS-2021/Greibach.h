#pragma once
#include "Errors.h"
#include <iostream>
#define NS(n) Rule::Chain::N(n)
#define TS(n) Rule::Chain::T(n)
typedef short GRBALPHABET;
namespace GRB
{
	struct Rule {
		GRBALPHABET nn;
		int iderror;
		short size;

		struct Chain {
			short size;
			GRBALPHABET* nt;
			Chain();
			Chain(short psize, GRBALPHABET ps, ...);
			std::string getCChain();
			static GRBALPHABET T(char t) { return GRBALPHABET(t); }
			static GRBALPHABET N(char n) { return -GRBALPHABET(n); }
			static bool isT(GRBALPHABET s) { return s > 0; }
			static bool isN(GRBALPHABET s) { return !isT(s); }
			static char alphabet_to_char(GRBALPHABET s) { return isT(s) ? char(s) : char(-s); }
		}*chains;

		Rule();
		Rule(GRBALPHABET pnn, int piderror, short psize, Chain pc, ...);
		std::string getCRule(short nchain);
		short getNextChain(GRBALPHABET t, Rule::Chain& chain, short n);
	};

	struct Greibach
	{
		short size;
		GRBALPHABET startN;
		GRBALPHABET stbottomT;
		Rule* rules;
		Greibach();
		Greibach(GRBALPHABET pstartN, GRBALPHABET pstbottomT, short psize, Rule pr, ...);
		short getRule(GRBALPHABET pnn, Rule& prule);
		Rule getRule(short pn);
	};
	const Greibach& getGreibach();
}