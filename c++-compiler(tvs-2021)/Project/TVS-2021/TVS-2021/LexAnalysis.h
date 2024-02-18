#pragma once
#include "Libs.h"
#include"Addictions.h"
namespace Lex
{
	struct LEX
	{
		IT::IdTable idtable;;
		LT::LexTable lextable;
	};
	char/*void*/ ArrayOfTokens(const char* str);
	void Scanner(LT::LexTable& lextable, IT::IdTable& idtable, In::IN& in, Parm::PARM& parm, Log::LOG& log, bool flag_tokens);
}