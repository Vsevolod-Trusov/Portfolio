#pragma once
#define _CRT_SECURE_NO_WARNINGS
#define ID_MAXSIZE		30								//максимальное количество символов в идентификаторе
#define SCOPE_MAXSIZE	30		
#define TI_MAXSIZE		4096							//макисмальное количество  строк в таблице идентификаторов
#define TI_VSH_DEFAULT	0x00000000						//значение по умолчанию дл€ типа integer
#define TI_STR_DEFAULT	0x00							//значение по умолчанию дл€ типа string
#define TI_BOL_DEFAULT	false							//значение по умолчанию дл€ типа boolean
#define TI_NULLIDX		((int)0xffffffff)				//нет элемента таблицы идентификаторов
#define TI_STR_MAXSIZE	255
namespace IT											//таблица идентификаторов
{
	enum IDDATATYPE { VSH = 1, STR = 2, BOL = 3 };		//типы данных идентификаторов : integer, string, boolean
	enum IDTYPE { V = 1, F, P, L };						//типы идентификаторов: переменна€, функци€, параметр, литерал
	struct Entry {
		int idxfirstLE;									//индекс первого вхождени€ в таблице лексем
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
	struct IdTable																//экземпл€р таблицы идентификаторов 
	{
		int maxsize;															//емкость таблицы идентификаторов < TI_MAXSIZE	
		int size;																//текущий размер таблицы идентификаторов  < maxsize
		Entry* table;															//массив строк таблицы идентификаторов 
	};
	IdTable	Create(																//создать таблицу идентификаторов
		int size																//емкость таблицы идентификторов < TI_MAXSIZE
	);
	void Add(																	//добавить строку в таблицу идентификаторов
		IdTable& idtable,														//экземпл€р таблицы	 идентификаторов
		const Entry& entry														//строка таблицы идентификаторов
	);
	Entry GetEntry(																//получить строку таблицы идентификаторов
		IdTable& idtable,														//экземпл€ таблицы идентификаторов
		int n																	//номер получаемой строки
	);
	int IsId(IdTable& idtable, const char scope[SCOPE_MAXSIZE], const char id[ID_MAXSIZE]);
	int IsLiteral(IdTable& idtable, const char literal[TI_STR_MAXSIZE]);
	int IsLiteral(IdTable& idtable, int literal);
	int IsLiteral(IdTable& idtable, bool literal);
	void Delete(IdTable& idtable);												//удалить таблицу(освободить пам€ть)
	void ShowIdTable(IdTable idtable,int startIndex = 0, int endIndex = 0);
	void WriteTable(IdTable idtable, int startIndex = 0, int endIndex = 0);
};
