#include"FST.h"
#include"Addictions.h"


	FST::NODE::NODE()
	{
		n_relation = 0;
		relations = NULL;
	}
	FST::NODE::NODE(short n, RELATION rel, ...)
	{
		n_relation = n;
		RELATION* p = &rel;
		relations = DBG_NEW RELATION[n];
		for (short i = 0; i < n; i++)relations[i] = p[i];
	}
	FST::RELATION::RELATION(char c, short nn)
	{
		symbol = c;
		nnode = nn;
	}
	FST::FST::FST(short ns, NODE  n, ...)
	{
		nstates = ns;
		nodes = DBG_NEW NODE[ns];
		NODE* p = &n;
		for (int k = 0; k < ns; k++)nodes[k] = p[k];
		rstates = DBG_NEW short[nstates];
		memset(rstates, 0xff, sizeof(short) * nstates);
		rstates[0] = 0;
		position = -1;																		// чтобы с 0 начинать в execute
	}
	bool FST::step(const char* string, FST& fst, short*& rstates, int& col)					// один шаг автомата
	{
		bool rc = false;
		swap(rstates, fst.rstates);															// смена массивов
		for (short i = 0; i < fst.nstates; ++i)
		{
			if (rstates[i] == fst.position)
			{
				for (short j = 0; j < fst.nodes[i].n_relation; ++j)
				{
					if (fst.nodes[i].relations[j].symbol == string[fst.position])
					{
						fst.rstates[fst.nodes[i].relations[j].nnode] = fst.position + 1;
						rc = true;
						col++;																//+2
					};

				};
			}
		};
		return rc;
	}
	bool FST::execute(const char* string, FST fst, int col)									// выполнить распознование цепочки
	{
		short* rstates = DBG_NEW short[fst.nstates];
		memset(rstates, 0xff, sizeof(short) * fst.nstates);
		short lstring = (short)strlen(string);
		bool rc = true;
		for (short i = 0; i < lstring && rc; ++i)
		{
			fst.position++;																	// продвинули позицию
			rc = step(string, fst, rstates, col);											// один шаг автомата
		};
		delete[] rstates;
		return(rc ? (fst.rstates[fst.nstates - 1] == lstring) : rc);
	};
