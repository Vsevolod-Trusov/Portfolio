#include"Parm.h"
#include"Errors.h"
#include <cwchar>
#include "Addictions.h"
using namespace std;
namespace Parm
{
	PARM getparm(int argc, wchar_t* argv[])
	{
		PARM parm;
		bool in = false,
			 out = false,
			 log = false;

		for (int i = 1; i < argc; i++)
		{
			if (wcslen(argv[i]) > PARM_MAX_SIZE)
				throw ERROR_THROW(104);
			if (wcsstr(argv[i], PARM_IN))
			{
				wcscpy_s(parm.in, argv[i] + wcslen(PARM_IN));
				in = true;
			}

			if (wcsstr(argv[i], PARM_OUT))
			{
				wcscpy_s(parm.out, argv[i] + wcslen(PARM_OUT));
				out = true;
			}
			if (wcsstr(argv[i], PARM_LOG))
			{
				wcscpy_s(parm.log, argv[i] + wcslen(PARM_LOG));
				log = true;
			}

			if (!_wcsnicmp(argv[i], PARM_ID, wcslen(PARM_ID)))
			{
				parm.idtable = true;
				cout << "���� -id �����" << endl;
			}
			if (!_wcsnicmp(argv[i], PARM_LEX, wcslen(PARM_LEX)))
			{
				parm.lextable = true;
				cout << "���� -lex �����" << endl;
			}
			if (!_wcsnicmp(argv[i], PARM_TOKENS, wcslen(PARM_TOKENS)))
			{
				parm.tokens = true;
				cout << "���� -tokens �����" << endl;
			}
			if (!_wcsnicmp(argv[i], PARM_RULES, wcslen(PARM_RULES)))
			{
				parm.rules = true;
				cout << "���� -rules �����" << endl;
			}
			if (!_wcsnicmp(argv[i], PARM_ASMCOMPILER, wcslen(PARM_ASMCOMPILER)))
			{
				parm.asmcompiler = true;
				cout << "���� -asmcompiler �����" << endl;
			}

		}
		if (!in)throw ERROR_THROW(100);
		if (!out) {
			wcscpy_s(parm.out, parm.in);
			wcscat_s(parm.out, PARM_ASM_DEFAULT_EXT);
		}
		if (!log) {
			wcscpy_s(parm.log, parm.in);
			wcscat_s(parm.log, PARM_LOG_DEFAULT_EXT);
		}
		return parm;
	}
};