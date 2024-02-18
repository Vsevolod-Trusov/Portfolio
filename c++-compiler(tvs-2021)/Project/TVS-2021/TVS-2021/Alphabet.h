#pragma once
#define IN_MAX_LEN_TEXT  1024*1024			// ������������ ������ ��������� ���� = 1��
#define IN_CODE_ENDL '\n'					// ������ ���� ������
#define IN_CODE_SEP '|'

// ������� �������� ������� ����������, ������ = ��� (Windows-1251) �������
// �������� IN::F - ����������� ������, IN::T - ����������� ������, IN::I - ������������ (�� �������) 
//			����	0 <= �������� < 256 - �� �������� ������ ��������

#define	IN_CODE_TABLE { \
	/*00*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::I, '|',   IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*10*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*20*/IN::S, IN::S, IN::K, IN::T, IN::T, IN::S, IN::F, IN::T, IN::S, IN::S, IN::S, IN::S, IN::S, IN::S, IN::T, IN::S, \
	/*30*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::S, IN::S, IN::S, IN::S, IN::S, IN::F, \
	/*40*/IN::F, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*50*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::S, IN::F, IN::S, IN::S, IN::T, \
	/*60*/IN::F, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*70*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::S, IN::F, IN::S, IN::S, IN::F, \
																								                          \
	/*80*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*90*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*A0*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::T, IN::F, IN::T, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*B0*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::T, IN::F, IN::T, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*C0*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*D0*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*E0*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*F0*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T  \
}

namespace In
{
	struct IN		// �������� ������
	{
		// T - ���������� ������, F - ������������, I - ������������, S - ����������� ������, K - ' ����� - ��������
		enum { T = 1024, F = 2048, I = 4096, S = 8192, K = 16384 };
		int size;								// ������ ��������� ����
		int lines;								// ���������� �����
		int ignor;								// ���-�� ����������������� ��������
		unsigned char* text;					// �������� ��� (Windows-1251)
		int code[256];							// ������� ��������: T, F, I - ����� ��������

		unsigned char** pointer;
		int counter_rows;
		int* CounterWordsinLine;
	};
	IN getin(wchar_t infile[]);					// ������ � ��������� ������� �����
	void output(unsigned char** words, int size);
};



