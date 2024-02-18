#pragma once
#define LEXEMA_FIXSIZE			1					//������������� ������ �������
#define LT_MAXSIZE				4096				//������������ ���-�� ����� � ������ ������
#define LT_TI_NULLIDX			((int)0xffffffff)	//��� �������� ������� ���������������
#define LEX_VSHORT				'v'					//������� ��� integer
#define LEX_STRING				's'					//������� ��� string
#define LEX_BOOLEAN				'b'					//������� ��� boolean
#define LEX_DATATYPE			't'	

#define LEX_FUNCTION			'f'					//������� ��� function 
#define LEX_CONVERT				'c'					//������� ��� convert
#define LEX_LENGTH				'e'					//������� ��� length 
#define LEX_COMPARE				'm'					//������� ��� compare 
#define LEX_OUTPUT				'x'					//������� ��� ������ ���������� 
#define LEX_OUTPUTS				'z'					//������� ��� ������ ���������� � ���� ������ 

#define LEX_SET					'd'					//������� ��� set 
#define LEX_RETRIEVE			'r'					//������� ��� retrieve 
#define LEX_PROGRAM				'p'					//������� ��� program 

#define LEX_PLUS				'+'					//������� ��� +
#define LEX_MINUS				'-'					//������� ��� -
#define LEX_STAR				'*'					//������� ��� *
#define LEX_DIRSLASH			'/'					//������� ��� /
#define LEX_PERCENT				'%'					//������� ��� %
#define LEX_MORE				'>'					//������� ��� >
#define LEX_LESS				'<'					//������� ��� <
#define LEX_MOREOREQUALS		':'					//������� ��� :
#define LEX_LESSOREQUALS		'^'					//������� ��� ^
#define LEX_TILDE				'~'					//������� ��� ~
#define LEX_EXMARK				'!'					//������� ��� !
#define LEX_OPERATOR			'v'

#define LEX_LEFTHESIS			'('					//������� ��� (
#define LEX_RIGHTHESIS			')'					//������� ��� )
#define LEX_SEMICOLON			';'					//������� ��� ;
#define LEX_COMMA				','					//������� ��� ,
#define LEX_LEFTBRACE			'{'					//������� ��� {
#define LEX_BRACELET			'}'					//������� ��� }
#define LEX_EQUALS				'='					//������� ��� =

#define LEX_IF					'k'				//������� ��� if
#define LEX_ELSE				'j'				//������� ��� else
#define LEX_ROUND				'h'				//������� ��� �����

#define LEX_TRUE				'u'					//������� ��� true
#define LEX_FALSE				'y'					//������� ��� false


#define LEX_ID					'i'					//������� ��� ��������������
#define LEX_STRING_LITERAL		'g'					//������� ��� �������� 
#define LEX_VSHORT_LITERAL		'q'					//������� ��� �������� 
#define LEX_LITERAL				'l'

#define LEX_COMMERCIALAT		'@'

namespace LT																//������� ������
{
	enum OPER { NOT = -1, PLUS = 1, MINUS, MUL, DIV, PERC, MORE, LESS, EQU, NOTEQU, MOREOREQU, LESSOREQU };

	struct Entry															//������ ������� ������
	{
		char lexema;														//�������
		int sn;																//����� ������ � �������� ������
		int idxTI;															//������ � ������� ��������������� ��� LI_TI_NALLIDX
		int priority = 0;
		OPER operation;
		char sign;															//true ������ ������� � �������
		bool sign_used = false;
		Entry() = default;
		Entry(char _lexema, int _sn,int _idxTI,int _priority, OPER _oper);
		Entry(char _lexema, int _sn,int _idxTI,int _priority);
		Entry(char _lexema, int _sn,int _idxTI,char _sign);
		Entry(char _lexema, int _sn,int _idxTI);
	};	
	struct LexTable															//��������� ������� ������
	{
		int maxsize;														//������� ������� ������ < LT_MAXSIZE
		int size;															//������� ������ ������� ������ < maxsize	
		Entry* table;														// ������ ����� ������� ������
	};
	LexTable Create(														//������� ������� ������
		int size															//������� ������� ������ <LT_MAXSIZE
	);
	void Add(																//�������� ������ � ������� ������
		LexTable& lextable,													//��������� ������� ������
		Entry entry															//������ ������� ������
	);
	Entry GetEntry(															//�������� ������ ������� ������
		LexTable& lextable,													//��������� ������� ������
		int n																//����� ���������� ������	
	);
	void Delete(LexTable& lextable);										//������� ������� ������(���������� ������)
	void ShowLexTable(LexTable lextable, int startIndex = 0, int endIndex = 0);
	void WriteLexTable(LT::LexTable lextable, int startIndex = 0, int endIndex = 0);
	
};



