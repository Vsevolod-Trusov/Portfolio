#include"Libs.h"
#include"Addictions.h"
namespace LT
{
	
	void WriteLexTable(LT::LexTable lextable, int startIndex, int endIndex)
	{
		if (endIndex == 0)
		{
			endIndex = lextable.size;
		}
		cout << "\n\n\n/ ==============############    Таблица лексем   ############======================================== \n";
		cout << std::right<< std::setw(4) << "index" << std::setw(20) << "lexema" << std::setw(25) << "Sign" << std::setw(25) << "IdTable index\n";
		for (size_t i = startIndex; i < endIndex; ++i)
		{
			if (lextable.table[i - 1].lexema == LEX_COMMERCIALAT)
				cout << std::setw(4) << i << std::setw(18) << '\'' << (int)lextable.table[i].lexema << '\'';
			else
				cout << std::setw(4) << i << std::setw(18) << '\'' << lextable.table[i].lexema << '\'';

			if (lextable.table[i].lexema != LEX_CONVERT && lextable.table[i].lexema != LEX_LENGTH &&
				lextable.table[i].lexema != LEX_LENGTH && lextable.table[i].lexema != LEX_LENGTH && lextable.table[i].lexema != LEX_ID &&
				lextable.table[i].lexema != LEX_LITERAL)
			{
				lextable.table[i].sign = '#';
				cout << std::setw(24) << lextable.table[i].sign;
			}
			else
				cout << std::setw(24) << lextable.table[i].sign;


			if (lextable.table[i].idxTI != LT_TI_NULLIDX)
			{
				cout << std::setw(19) << lextable.table[i].idxTI;
			}
			cout << "\n\n";
		}
	}
	Entry::Entry(char _lexema, int _sn, int _idxTI, int _priority, OPER _oper)
	{
		lexema = _lexema;
		sn = _sn;
		idxTI = _idxTI;
		priority = _priority;
		operation = _oper;
	}
	Entry::Entry(char _lexema, int _sn, int _idxTI, int _priority)
	{
		lexema = _lexema;
		sn = _sn;
		idxTI = _idxTI;
		priority = _priority;
	}
	Entry::Entry(char _lexema, int _sn, int _idxTI, char _sign)
	{
		lexema = _lexema;
		sn = _sn;
		idxTI = _idxTI;
		sign = _sign;
	}
	Entry::Entry(char _lexema, int _sn, int _idxTI)
	{
		lexema = _lexema;
		sn = _sn;
		idxTI = _idxTI;
	}
	LexTable LT::Create(int size) {
		if (size > LT_MAXSIZE) {
			throw ERROR_THROW(120);
		}
		LexTable lextable;
		lextable.maxsize = size;
		lextable.size = 0;
		lextable.table = DBG_NEW Entry[size];
		return lextable;
	}
	void Add(LexTable& lextable, Entry entry)
	{
		if (lextable.size + 1 > lextable.maxsize)
			throw ERROR_THROW(121);
		lextable.table[lextable.size] = entry;
		lextable.size++;
	}
	Entry GetEntry(LexTable& lextable, int n)
	{
		if (n < 0 || n > lextable.size - 1) {
			throw ERROR_THROW(122);
		}
		return lextable.table[n];
	}
	void Delete(LexTable& lextable)
	{
		if (!lextable.table) {
			return;
		}

		delete[] lextable.table;
		lextable.table = nullptr;
	}

	void ShowLexTable(LexTable lextable, int startIndex, int endIndex)
	{
		std::ofstream LexT("LexTable.txt");
		if (endIndex == 0)
		{
			endIndex = lextable.size;
		}
		LexT << "/ ==============############    Таблица лексем   ############======================================== \n";
		LexT << std::setw(4) << "index"  << std::setw(20) << "lexema"  << std::setw(25)<<"Sign" << std::setw(25) << "IdTable index\n";
		for (size_t i = startIndex; i < endIndex; ++i)
		{
			if (lextable.table[i - 1].lexema == LEX_COMMERCIALAT)
				LexT << std::setw(4) << i << std::setw(18) << '\'' << (int)lextable.table[i].lexema << '\'';
			else
				LexT << std::setw(4) << i << std::setw(18) << '\'' << lextable.table[i].lexema << '\'';
			
			if (lextable.table[i].lexema != LEX_CONVERT && lextable.table[i].lexema != LEX_LENGTH &&
				lextable.table[i].lexema != LEX_LENGTH && lextable.table[i].lexema != LEX_LENGTH && lextable.table[i].lexema != LEX_ID &&
				lextable.table[i].lexema != LEX_LITERAL)
			{
				lextable.table[i].sign = '#';
				LexT << std::setw(24)<< lextable.table[i].sign;
			}
			else
				LexT << std::setw(24)<< lextable.table[i].sign;
			

			if (lextable.table[i].idxTI != LT_TI_NULLIDX)
			{
				LexT << std::setw(19) << lextable.table[i].idxTI;
			}
			LexT << '\n';
		}
	}
}