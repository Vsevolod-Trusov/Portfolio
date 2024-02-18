#pragma once
#include "LT.h"
#include "IT.h"
#include "Log.h"
namespace SA
{
	void SemAnalysis(LT::LexTable& lextable, IT::IdTable& idtable, const Log::LOG& log );
	void —heck—ondition(LT::LexTable& lextable, IT::IdTable& idtable);
	void Types(LT::LexTable& lextable, IT::IdTable& idtable);
	void CheckRetrieveValueOfFunction(LT::LexTable& lextable, IT::IdTable& idtable);
	void CheckOfParameterTypes(LT::LexTable& lextable, IT::IdTable& idtable);
	void Check—ountOfParameter(LT::LexTable& lextable, IT::IdTable& idtable);
	//void TypeAnalyser(LT::LexTable& lextable, IT::IdTable& idtable);
	
	
}