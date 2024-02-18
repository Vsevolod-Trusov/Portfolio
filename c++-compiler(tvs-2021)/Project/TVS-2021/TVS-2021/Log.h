#pragma once
#include<fstream>
#include"Alphabet.h"
#include"Errors.h"
#include"Parm.h"
using namespace std;

namespace Log		// работа с протоколм
{
	struct LOG		// протокол 
	{
		wchar_t logfile[PARM_MAX_SIZE];		// имя файла протокола
		ofstream* stream;					// выходной поток протокола
	};

	static const LOG INITLOG = { L"", NULL };		//	структура для начальной инициализции LOG
	LOG getlog(wchar_t logfile[]);					// сформировать структуру LOG
	void WriteLine(LOG log, const char* c, ...);	// вывести в протокол конкатенацию строк
	void WriteLine(LOG log, const wchar_t* c, ...);	// вывести в протокол конкатенацию строк
	void WriteLog(LOG log);							// вывести в протокол заголовок
	void WriteParm(LOG log, Parm::PARM parm);		// вывести в протокол информацию о входных параметрах
	void WriteIn(LOG log, In::IN in);				// вывксти в протокол о входном потоке
	void WriteError(LOG log, Error::ERROR error);	// вывести в протокол информацию об ошибке
	void Close(LOG log);							// закрыть протокол
};
