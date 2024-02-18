#pragma once
#define LEXEMA_FIXSIZE			1					//фиксированный размер лексемы
#define LT_MAXSIZE				4096				//максимальное кол-во строк в таблце лексем
#define LT_TI_NULLIDX			((int)0xffffffff)	//нет элемента таблицы ижентификаторов
#define LEX_VSHORT				'v'					//лексема для integer
#define LEX_STRING				's'					//лексема для string
#define LEX_BOOLEAN				'b'					//лексема для boolean
#define LEX_DATATYPE			't'	

#define LEX_FUNCTION			'f'					//лексема для function 
#define LEX_CONVERT				'c'					//лексема для convert
#define LEX_LENGTH				'e'					//лексема для length 
#define LEX_COMPARE				'm'					//лексема для compare 
#define LEX_OUTPUT				'x'					//лексема для вывода переменных 
#define LEX_OUTPUTS				'z'					//лексема для вывода переменных в одну строку 

#define LEX_SET					'd'					//лексема для set 
#define LEX_RETRIEVE			'r'					//лексема для retrieve 
#define LEX_PROGRAM				'p'					//лексема для program 

#define LEX_PLUS				'+'					//лексема для +
#define LEX_MINUS				'-'					//лексема для -
#define LEX_STAR				'*'					//лексема для *
#define LEX_DIRSLASH			'/'					//лексема для /
#define LEX_PERCENT				'%'					//лексема для %
#define LEX_MORE				'>'					//лексема для >
#define LEX_LESS				'<'					//лексема для <
#define LEX_MOREOREQUALS		':'					//лексема для :
#define LEX_LESSOREQUALS		'^'					//лексема для ^
#define LEX_TILDE				'~'					//лексема для ~
#define LEX_EXMARK				'!'					//лексема для !
#define LEX_OPERATOR			'v'

#define LEX_LEFTHESIS			'('					//лексема для (
#define LEX_RIGHTHESIS			')'					//лексема для )
#define LEX_SEMICOLON			';'					//лексема для ;
#define LEX_COMMA				','					//лексема для ,
#define LEX_LEFTBRACE			'{'					//лексема для {
#define LEX_BRACELET			'}'					//лексема для }
#define LEX_EQUALS				'='					//лексема для =

#define LEX_IF					'k'				//лексема для if
#define LEX_ELSE				'j'				//лексема для else
#define LEX_ROUND				'h'				//лексема для цикла

#define LEX_TRUE				'u'					//лексема для true
#define LEX_FALSE				'y'					//лексема для false


#define LEX_ID					'i'					//лексема для идентификатора
#define LEX_STRING_LITERAL		'g'					//лексема для литерала 
#define LEX_VSHORT_LITERAL		'q'					//лексема для литерала 
#define LEX_LITERAL				'l'

#define LEX_COMMERCIALAT		'@'

namespace LT																//таблица лексем
{
	enum OPER { NOT = -1, PLUS = 1, MINUS, MUL, DIV, PERC, MORE, LESS, EQU, NOTEQU, MOREOREQU, LESSOREQU };

	struct Entry															//строка таблицы лексем
	{
		char lexema;														//лексема
		int sn;																//номер строки в исходном тексте
		int idxTI;															//индекс в таблице идентификаторов или LI_TI_NALLIDX
		int priority = 0;
		OPER operation;
		char sign;															//true значит лексема с минусом
		bool sign_used = false;
		Entry() = default;
		Entry(char _lexema, int _sn,int _idxTI,int _priority, OPER _oper);
		Entry(char _lexema, int _sn,int _idxTI,int _priority);
		Entry(char _lexema, int _sn,int _idxTI,char _sign);
		Entry(char _lexema, int _sn,int _idxTI);
	};	
	struct LexTable															//экземпляр таблицы лексем
	{
		int maxsize;														//емкость таблицы лексем < LT_MAXSIZE
		int size;															//текущий размер таблицы лексем < maxsize	
		Entry* table;														// массив строк таблицы лексем
	};
	LexTable Create(														//создать таблицу лексем
		int size															//емкость таблицы лексем <LT_MAXSIZE
	);
	void Add(																//добавить строку в таблицу лексем
		LexTable& lextable,													//экземпляр таблицы лексем
		Entry entry															//строка таблицы лексем
	);
	Entry GetEntry(															//получить строку таблицы лексем
		LexTable& lextable,													//экземпляр таблицы лексем
		int n																//номер получаемой строки	
	);
	void Delete(LexTable& lextable);										//удалить таблицу лексем(освободить память)
	void ShowLexTable(LexTable lextable, int startIndex = 0, int endIndex = 0);
	void WriteLexTable(LT::LexTable lextable, int startIndex = 0, int endIndex = 0);
	
};



