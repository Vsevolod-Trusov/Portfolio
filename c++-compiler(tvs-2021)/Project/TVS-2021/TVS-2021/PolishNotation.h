#pragma once
#include"LT.h"
#include"IT.h"
#define SIZE_OF_EXPRESSION 200
namespace PN
{
	void Polish(LT::LexTable& lextable, IT::IdTable& idtable);
	int GetExpr(LT::LexTable, int i);
	int Priorities(char operation);
	int ConvertExpr(LT::Entry* expr, LT::LexTable lextable, IT::IdTable idtable, int position, int endOfexpression);
	void AddExpr(LT::LexTable& lextable, IT::IdTable& idtable, LT::Entry* expression, int StartPosition, int SizeOfExpression);
	void PullUpLexTable(LT::LexTable& lextable, IT::IdTable& idatable, int StartPosition, int SizeOfExpression, int EndOfExpression);
	void SynchronizeTables(LT::LexTable& lextable, IT::IdTable& idtable);

}