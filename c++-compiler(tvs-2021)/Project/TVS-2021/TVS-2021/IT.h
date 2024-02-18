#pragma once
#define _CRT_SECURE_NO_WARNINGS
#define ID_MAXSIZE		30								//������������ ���������� �������� � ��������������
#define SCOPE_MAXSIZE	30		
#define TI_MAXSIZE		4096							//������������ ����������  ����� � ������� ���������������
#define TI_VSH_DEFAULT	0x00000000						//�������� �� ��������� ��� ���� integer
#define TI_STR_DEFAULT	0x00							//�������� �� ��������� ��� ���� string
#define TI_BOL_DEFAULT	false							//�������� �� ��������� ��� ���� boolean
#define TI_NULLIDX		((int)0xffffffff)				//��� �������� ������� ���������������
#define TI_STR_MAXSIZE	255
namespace IT											//������� ���������������
{
	enum IDDATATYPE { VSH = 1, STR = 2, BOL = 3 };		//���� ������ ��������������� : integer, string, boolean
	enum IDTYPE { V = 1, F, P, L };						//���� ���������������: ����������, �������, ��������, �������
	struct Entry {
		int idxfirstLE;									//������ ������� ��������� � ������� ������
		char scope[SCOPE_MAXSIZE];
		char id[ID_MAXSIZE];
		IDDATATYPE iddatatype;
		IDTYPE idtype;
		int countOfPar = 0;
		union {
			int vshort;
			bool vbool;
			struct {
				char len;
				char str[TI_STR_MAXSIZE - 1];
			} vstr;
		} value;
		Entry() = default;
		Entry(int idxfirstLE, const char* scope, const char* id, IDTYPE idtype, int value);
		Entry(int idxfirstLE, const char* scope, const char* id, IDTYPE idtype, bool value);
		Entry(int idxfirstLE, const char* scope, const char* id, IDTYPE idtype, const char* value);
		Entry(int idxfirstLE, const char* scope, const char* id, IDDATATYPE iddatatype, IDTYPE idtype);
	};
	struct IdTable																//��������� ������� ��������������� 
	{
		int maxsize;															//������� ������� ��������������� < TI_MAXSIZE	
		int size;																//������� ������ ������� ���������������  < maxsize
		Entry* table;															//������ ����� ������� ��������������� 
	};
	IdTable	Create(																//������� ������� ���������������
		int size																//������� ������� �������������� < TI_MAXSIZE
	);
	void Add(																	//�������� ������ � ������� ���������������
		IdTable& idtable,														//��������� �������	 ���������������
		const Entry& entry														//������ ������� ���������������
	);
	Entry GetEntry(																//�������� ������ ������� ���������������
		IdTable& idtable,														//�������� ������� ���������������
		int n																	//����� ���������� ������
	);
	int IsId(IdTable& idtable, const char scope[SCOPE_MAXSIZE], const char id[ID_MAXSIZE]);
	int IsLiteral(IdTable& idtable, const char literal[TI_STR_MAXSIZE]);
	int IsLiteral(IdTable& idtable, int literal);
	int IsLiteral(IdTable& idtable, bool literal);
	void Delete(IdTable& idtable);												//������� �������(���������� ������)
	void ShowIdTable(IdTable idtable,int startIndex = 0, int endIndex = 0);
	void WriteTable(IdTable idtable, int startIndex = 0, int endIndex = 0);
};
