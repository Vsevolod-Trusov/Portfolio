#pragma once
#define PARM_IN		L"-in:"						// ���� ��� ����� ��������� ����
#define PARM_OUT	L"-out:"					// ���� ��� ����� ���������� ����
#define PARM_LOG	L"-log:"					// ���� ��� ����� ����� �������

#define PARM_LEX	L"-lex"
#define PARM_ID		L"-id"
#define PARM_TOKENS L"-tokens"
#define PARM_RULES  L"-rules"
#define PARM_ASMCOMPILER  L"-asmcompiler"

#define PARM_MAX_SIZE	300						// ������������ ����� ������ ���������
#define PARM_OUT_DEFAULT_EXT	L".out"			// ���������� ����� ���������� ���� �� ���������
#define PARM_ASM_DEFAULT_EXT	L".out.asm"			// ���������� ����� ���������� ���� �� ���������
//#define PARM_DEFASM_DEFAULT_EXT	L".out"			// ���������� ����� ���������� ���� �� ���������
#define PARM_LOG_DEFAULT_EXT	L".log"			// ���������� ����� ��������� �� ���������
#define PARM_TXT_DEFAULT_EXT	L".txt"

namespace Parm									// ��������� ������� ����������
{
	struct PARM									// ������� ���������
	{
		wchar_t in[PARM_MAX_SIZE];				// -in:		��� ����� ��������� ���������
		wchar_t out[PARM_MAX_SIZE];				// -out:	��� ����� ���������� ����
		wchar_t log[PARM_MAX_SIZE];				// -log:	��� ����� ���������

		bool lextable= false;									// -lex - ���� ��� ������ ��
		bool idtable = false;									// -id - ���� ��� ������ ��
		bool tokens	 = false;									// -tokens ���� ��� ������ ���� � ���� �������
		bool rules   = false;										// -rules ���� ��� ������ ������
		bool asmcompiler   = false;										// -rules ���� ��� ������ ������
	};
	
	PARM getparm(int argc, wchar_t* argv[]);		// ������������ struct PARM �� ������ ���������� �������
};


