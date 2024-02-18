#pragma once
#define PARM_IN		L"-in:"						// ключ для файла исходного кода
#define PARM_OUT	L"-out:"					// ключ для файла объектного кода
#define PARM_LOG	L"-log:"					// ключ для файла файла журнала

#define PARM_LEX	L"-lex"
#define PARM_ID		L"-id"
#define PARM_TOKENS L"-tokens"
#define PARM_RULES  L"-rules"
#define PARM_ASMCOMPILER  L"-asmcompiler"

#define PARM_MAX_SIZE	300						// максимальная длина строки параметра
#define PARM_OUT_DEFAULT_EXT	L".out"			// расширение файла объектного кода по умолчанию
#define PARM_ASM_DEFAULT_EXT	L".out.asm"			// расширение файла объектного кода по умолчанию
//#define PARM_DEFASM_DEFAULT_EXT	L".out"			// расширение файла объектного кода по умолчанию
#define PARM_LOG_DEFAULT_EXT	L".log"			// расширение файла протокола по умолчанию
#define PARM_TXT_DEFAULT_EXT	L".txt"

namespace Parm									// обработка входных параметров
{
	struct PARM									// входные параметры
	{
		wchar_t in[PARM_MAX_SIZE];				// -in:		имя файла исходного протокола
		wchar_t out[PARM_MAX_SIZE];				// -out:	имя файла объектного кода
		wchar_t log[PARM_MAX_SIZE];				// -log:	имя файла протокола

		bool lextable= false;									// -lex - ключ для вывода ТЛ
		bool idtable = false;									// -id - ключ для вывода ТИ
		bool tokens	 = false;									// -tokens ключ для вывода кода в виде токенов
		bool rules   = false;										// -rules ключ для вывода правил
		bool asmcompiler   = false;										// -rules ключ для вывода правил
	};
	
	PARM getparm(int argc, wchar_t* argv[]);		// сформировать struct PARM на основе параметров функции
};


