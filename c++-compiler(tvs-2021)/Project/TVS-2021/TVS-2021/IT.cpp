#include"Libs.h"
#include"Addictions.h"
namespace IT
{
	void WriteTable(IdTable idtable, int startIndex, int endIndex)
	{
	
		if (endIndex == 0)
		{
			endIndex = idtable.size;
		}
		cout << "\n\n\n/ =============############    Таблица идентификаторов   ############======================================== /\n";
		cout << std::right << std::setw(5)<<std::setfill(' ') << "index" << std::setw(20)<<std::setfill(' ') << "name" << std::setw(30)<< std::setfill(' ') << " Number of parameters " << std::setw(10) << std::setfill(' ') << "scope"
			<< std::setw(10) << std::setfill(' ') << "type" << std::setw(10) << std::setfill(' ') << "id type" << std::setw(20) << std::setfill(' ') << "lexTable index" << std::setw(20) << std::setfill(' ') << "Value\n";
		for (size_t i = startIndex; i < endIndex; ++i)
		{
			cout << std::setw(4) << std::setfill(' ') << i << std::setw(22) << std::setfill(' ') << idtable.table[i].id << std::setw(16) << std::setfill(' ');
			if (idtable.table[i].idtype == IT::IDTYPE::F)
				cout << idtable.table[i].countOfPar << std::setw(23);
			else
				cout << "-" << std::setw(23) << std::setfill(' ');

			cout << idtable.table[i].scope << std::setw(10) << std::setfill(' ');

			if (idtable.table[i].iddatatype == IDDATATYPE::VSH)
				cout << "vsh ";
			else if (idtable.table[i].iddatatype == IDDATATYPE::STR)
				cout << "str ";
			else if (idtable.table[i].iddatatype == IDDATATYPE::BOL)
				cout << "bol ";
			cout << std::setw(8) << std::setfill(' ');
			if (idtable.table[i].idtype == IDTYPE::F)
				cout << "f ";
			else if (idtable.table[i].idtype == IDTYPE::L)
				cout << "l ";
			else if (idtable.table[i].idtype == IDTYPE::P)
				cout << "p ";
			else if (idtable.table[i].idtype == IDTYPE::V)
				cout << "v ";
			cout << std::setw(15) << std::setfill(' ') << idtable.table[i].idxfirstLE;
			cout << std::setw(15) << std::setfill(' ');
			if ((idtable.table[i].idtype == IDTYPE::F) || (idtable.table[i].idtype == IDTYPE::P))
			{
				cout << std::setw(24) << std::setfill(' ') << "-";
			}
			else if ((idtable.table[i].idtype == IDTYPE::V) && (idtable.table[i].iddatatype == IDDATATYPE::VSH))
			{
				cout << std::setw(24) << std::setfill(' ') << TI_VSH_DEFAULT << " ";
			}
			else if ((idtable.table[i].idtype == IDTYPE::V) && (idtable.table[i].iddatatype == IDDATATYPE::STR))
			{
				cout << std::setw(23) << std::setfill(' ') << '{' << (int)idtable.table[i].value.vstr.len << '}' << '\"' << '\"';
			}
			else if ((idtable.table[i].idtype == IDTYPE::V) && (idtable.table[i].iddatatype == IDDATATYPE::BOL))
			{
				cout << std::setw(27) << std::setfill(' ') << "false";
			}
			else if ((idtable.table[i].idtype == IDTYPE::L) && (idtable.table[i].iddatatype == IDDATATYPE::VSH))
				cout << std::setw(24) << std::setfill(' ') << idtable.table[i].value.vshort;
			else if ((idtable.table[i].idtype == IDTYPE::L) && (idtable.table[i].iddatatype == IDDATATYPE::STR))
			{
				cout << std::setw(23) << std::setfill(' ') << '{' << (int)idtable.table[i].value.vstr.len << '}' << '\"' << idtable.table[i].value.vstr.str << '\"';
			}
			else if ((idtable.table[i].idtype == IDTYPE::L) && (idtable.table[i].iddatatype == IDDATATYPE::BOL))
			{
				if (idtable.table[i].value.vbool)
					cout << std::setw(26) << std::setfill(' ') << "true";
				else
					cout << std::setw(27) << std::setfill(' ') << "false";
			}
			cout << "\n\n";
		}
	}
	IdTable	Create(int size)
	{
		IdTable* Table = new IdTable;
		if (size > TI_MAXSIZE)
			throw ERROR_THROW(160);
		Table->maxsize = size;
		Table->size = 0;
		Table->table = new Entry[size];
		return *Table;
	}
	void Add(IdTable& idtable, const Entry& entry)
	{
		if (idtable.size + 1 > idtable.maxsize)
			throw ERROR_THROW(161);
		idtable.table[idtable.size] = entry;
		idtable.size++;
	}
	Entry GetEntry(IdTable& idtable, int n)
	{
		if (n < 0 || n > idtable.size - 1) {
			throw ERROR_THROW(162);
		}
		return idtable.table[n];
	}
	int IT::IsId(IdTable& idtable, const char scope[SCOPE_MAXSIZE], const char id[ID_MAXSIZE]) {		// Проверка на повторное вхождение в таблице иентификаторов
		for (int i = 0; i < idtable.size; ++i) {
			if (idtable.table[i].idtype != IT::IDTYPE::L
				&& !memcmp(scope, idtable.table[i].scope, (strlen(idtable.table[i].scope) < SCOPE_MAXSIZE ?
					strlen(idtable.table[i].scope) : SCOPE_MAXSIZE))												/*!memcmp(id, idtable.table[i].id, (strlen(idtable.table[i].id) < ID_MAXSIZE ?
																														strlen(idtable.table[i].id) : ID_MAXSIZE)))*/
				/*&&  !strcmp(scope, idtable.table[i].scope)*/
				&&  !strcmp(id, idtable.table[i].id))
			{
				return i;
			}
		}
		return TI_NULLIDX;
	}
	int IsLiteral(IdTable& idtable, const char literal[TI_STR_MAXSIZE]) {
		for (int i = 0; i < idtable.size; ++i) {
			if (!strcmp(idtable.table[i].value.vstr.str, literal) &&
				idtable.table[i].idtype == IT::IDTYPE::L && idtable.table[i].iddatatype == IT::IDDATATYPE::STR) {
				return i;
			}
		}
		return TI_NULLIDX;
	}
	int IsLiteral(IdTable& idtable, int literal) {
		for (int i = 0; i < idtable.size; ++i) {
			if (idtable.table[i].value.vshort == literal &&
				idtable.table[i].idtype == IT::IDTYPE::L && idtable.table[i].iddatatype == IT::IDDATATYPE::VSH) {
				return i;
			}
		}
		return TI_NULLIDX;
	}
	int IsLiteral(IdTable& idtable, bool literal) {
		for (int i = 0; i < idtable.size; ++i) {
			if (idtable.table[i].value.vbool == literal &&
				idtable.table[i].idtype == IT::IDTYPE::L && idtable.table[i].iddatatype == IT::IDDATATYPE::BOL) {
				return i;
			}
		}
		return TI_NULLIDX;
	}
	void Delete(IdTable& idtable)
	{
		if (!idtable.table) {
			return;
		}
		delete[] idtable.table;
		idtable.table = nullptr;
	}
	Entry::Entry(int idxfirstLE, const char* scope, const char* id, IDTYPE idtype, int value)
	{
		this->idxfirstLE = idxfirstLE;
		this->iddatatype = IDDATATYPE::VSH;
		this->idtype = idtype;
		memcpy_s(this->id, sizeof(this->id), id, sizeof(this->id));
		memcpy_s(this->scope, sizeof(this->scope), scope, sizeof(this->scope));
		this->value.vshort = value;
	}
	Entry::Entry(int idxfirstLE, const char* scope, const char* id, IDTYPE idtype, bool value)
	{
		this->idxfirstLE = idxfirstLE;
		this->iddatatype = IDDATATYPE::BOL;
		this->idtype = idtype;
		memcpy_s(this->id, sizeof(this->id), id, sizeof(this->id));
		memcpy_s(this->scope, sizeof(this->scope), scope, sizeof(this->scope));
		this->value.vbool = value;
	}
	Entry::Entry(int idxfirstLE, const char* scope, const char* id, IDTYPE idtype, const char* value)
	{
		this->idxfirstLE = idxfirstLE;
		this->iddatatype = IDDATATYPE::STR;
		this->idtype = idtype;
		memcpy_s(this->id, sizeof(this->id), id, sizeof(this->id));
		memcpy_s(this->scope, sizeof(this->scope), scope, sizeof(this->scope));
		this->value.vstr.len = (char)strlen(value);
		strcpy_s(this->value.vstr.str, value);
	}
	Entry::Entry(int idxfirstLE, const char* scope, const char* id, IDDATATYPE iddatatype, IDTYPE idtype)
	{
		this->idxfirstLE = idxfirstLE;
		this->iddatatype = iddatatype;
		this->idtype = idtype;
		memcpy_s(this->id, sizeof(this->id), id, sizeof(this->id));
		memcpy_s(this->scope, sizeof(this->scope), scope, sizeof(this->scope));

		if (this->iddatatype == IDDATATYPE::VSH) {
			value.vshort = TI_VSH_DEFAULT;
		}
		else if(this->iddatatype == IDDATATYPE::STR) {
			value.vstr.len = TI_STR_DEFAULT;
		}
		else
		{
			value.vbool = TI_BOL_DEFAULT;
		}
	}
	
	
	void ShowIdTable(IdTable idtable, int startIndex, int endIndex)
	{
		std::ofstream IdT("IdTable.txt");
		if (endIndex == 0)
		{
			endIndex = idtable.size;
		}
		IdT << "/ =============############    Таблица идентификаторов   ############======================================== /\n";
		IdT << std::setw(5) << "index" << std::setw(20) << "name" << std::setw(30) << " Number of parameters " << std::setw(10) << "scope"
			<< std::setw(10) << "type" << std::setw(10) << "id type" << std::setw(20) << "lexTable index" << std::setw(20)<< "Value\n";
		for (size_t i = startIndex; i < endIndex; ++i)
		{
			IdT << std::setw(4) << i << std::setw(22) << idtable.table[i].id << std::setw(16);
			if (idtable.table[i].idtype == IT::IDTYPE::F)
				IdT << idtable.table[i].countOfPar << std::setw(23);
			else
				IdT << "-" << std::setw(23);
			
			IdT<< idtable.table[i].scope << std::setw(10);
			
			if (idtable.table[i].iddatatype == IDDATATYPE::VSH)
				IdT << "vsh ";
			else if (idtable.table[i].iddatatype == IDDATATYPE::STR)
				IdT << "str ";
			else if (idtable.table[i].iddatatype == IDDATATYPE::BOL)
				IdT << "bol ";
			IdT << std::setw(8);
			if (idtable.table[i].idtype == IDTYPE::F)
				IdT << "f ";
			else if (idtable.table[i].idtype == IDTYPE::L)
				IdT << "l ";
			else if (idtable.table[i].idtype == IDTYPE::P)
				IdT << "p ";
			else if (idtable.table[i].idtype == IDTYPE::V)
				IdT << "v ";
			IdT << std::setw(15) << idtable.table[i].idxfirstLE;
			IdT << std::setw(15);
			if ((idtable.table[i].idtype == IDTYPE::F) || (idtable.table[i].idtype == IDTYPE::P))
			{
				IdT << std::setw(24) << "-";
			}
			else if ((idtable.table[i].idtype == IDTYPE::V) && (idtable.table[i].iddatatype == IDDATATYPE::VSH))
			{
				IdT << std::setw(24) << TI_VSH_DEFAULT << " ";
			}
			else if ((idtable.table[i].idtype == IDTYPE::V) && (idtable.table[i].iddatatype == IDDATATYPE::STR))
			{
				IdT << std::setw(23) << '{' << (int)idtable.table[i].value.vstr.len << '}' << '\"' << '\"';
			}
			else if ((idtable.table[i].idtype == IDTYPE::V) && (idtable.table[i].iddatatype == IDDATATYPE::BOL))
			{
				IdT << std::setw(27) << "false";
			}
			else if ((idtable.table[i].idtype == IDTYPE::L) && (idtable.table[i].iddatatype == IDDATATYPE::VSH))
				IdT << std::setw(24) << idtable.table[i].value.vshort;
			else if ((idtable.table[i].idtype == IDTYPE::L) && (idtable.table[i].iddatatype == IDDATATYPE::STR))
			{
				IdT << std::setw(23) << '{' << (int)idtable.table[i].value.vstr.len << '}' << '\"' << idtable.table[i].value.vstr.str << '\"';
			}
			else if ((idtable.table[i].idtype == IDTYPE::L) && (idtable.table[i].iddatatype == IDDATATYPE::BOL))
			{
				if (idtable.table[i].value.vbool)
					IdT << std::setw(26) << "true";
				else
					IdT << std::setw(27) << "false";
			}
			IdT << '\n';
		}
	}
}






