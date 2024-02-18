#pragma once
#include "Parm.h"
#include "LT.h"
#include "IT.h"
#include "LexAnalysis.h"

namespace Generator
{
	struct Gener
	{
		LT::LexTable lextable;
		IT::IdTable idtable;
		std::ofstream out;

		Gener(LT::LexTable lexT, IT::IdTable IdT, const wchar_t out[]);

		void Head();
		void Constants();
		void Data();
		void Code();
	};
};