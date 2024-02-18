#include "Addictions.h"
#include "Generation.h"

using namespace std;

namespace Generator
{
	Gener::Gener(LT::LexTable plexT, IT::IdTable pidT, const wchar_t outfile[])
	{
		idtable = pidT;
		lextable = plexT;
		out = std::ofstream(outfile, ios_base::out);
		Head();
		Constants();
		Data();
		Code();
	}

	void Gener::Head()
	{
		out << ".586\n";
		out << ".model flat, stdcall\n";
		out << "includelib libucrt.lib\n";
		out << "includelib kernel32.lib\n";
		out << "includelib msvcrt.lib\n";
		out << "includelib Iphlpapi.lib\n";
		out << "includelib ../Debug/TVS-2021_Lib.lib\n";
		out << "ExitProcess PROTO :DWORD\n\n";

		/*out << "EXTRN Compare : proc\n";
		out << "EXTRN StrLength :proc\n";
		out << "EXTRN Convert :proc\n";
		out << "EXTRN OutVShortL :proc\n";
		out << "EXTRN OutVShort :proc\n";
		out << "EXTRN OutStringL :proc\n";
		out << "EXTRN OutString :proc\n";
		out << "EXTRN OutBooleanL :proc\n\n";
		out << "EXTRN OutBoolean :proc\n\n";*/

		out << " Compare	 proto :DWORD,: DWORD\n";
		out << " StrLength	 proto :DWORD\n";
		out << " Convert	 proto :DWORD\n";
		out << " OutVShortL	 proto :SWORD\n";
		out << " OutVShort	 proto :SWORD\n";
		out << " OutStringL	 proto :DWORD\n";
		out << " OutString	 proto :DWORD\n";
		out << " OutBooleanL proto :SWORD\n\n";
		out << " OutBoolean	 proto :SWORD\n\n";

		out << "\n.stack 4096\n\n";
	}

	void Gener::Constants()
	{
		out << ".const\n";
		for (int i = 0; i < idtable.size; i++)
		{
			if (idtable.table[i].idtype == IT::L)
			{
				out << "\t" << idtable.table[i].id;
				if (idtable.table[i].iddatatype == IT::STR)
					out << " BYTE \"" << idtable.table[i].value.vstr.str << "\", 0";
				if (idtable.table[i].iddatatype == IT::VSH)
					out << " SWORD " << idtable.table[i].value.vshort;
				if (idtable.table[i].iddatatype == IT::BOL)
					out << " SWORD " << idtable.table[i].value.vbool;
				out << '\n';
			}
		}
	}

	void Gener::Data()
	{
		out << "\n.data\n";
		out << "\tbuffer BYTE 256 dup(0)\n";
		for (int i = 0; i < lextable.size; i++)
		{
			if (lextable.table[i].lexema == LEX_SET)
			{
				if (idtable.table[lextable.table[i + 2].idxTI].idtype == IT::V)
				{
					out << "\t" << idtable.table[lextable.table[i + 2].idxTI].scope << idtable.table[lextable.table[i + 2].idxTI].id;
					if (idtable.table[lextable.table[i + 2].idxTI].iddatatype == IT::STR)
					{
						out << " DWORD ?\n";
					}
					if (idtable.table[lextable.table[i + 2].idxTI].iddatatype == IT::VSH || idtable.table[lextable.table[i + 2].idxTI].iddatatype == IT::BOL)
					{
						out << " SWORD 0\n";
					}
				}
			}
		}
	}

	void Gener::Code()
	{
		out << "\n.code\n";
		int size = 300;
		int index = 0;
		int *array_of_parameters_positions = new int[size];
		int num_of_points = 0;
		int indOfFunc = -1;
		int indOflex = -1;
		int count_of_parameters = 0;
		bool func = false;
		bool main = false;
		bool flag_round = false;
		bool flag_com = false;
		bool flag_if = false;
		bool flag_else = false;
		int stackRet = 0;
		int Ifsn = 0;
		int flagelse = 0;
		char operation;
		int num_of_round = 0;
		for (int i = 0; i < lextable.size; i++) {
			switch (lextable.table[i].lexema) {
			case LEX_FUNCTION: {
				if (func || main)
					break;
				indOfFunc = i + 1;
				out  <<"\n\n" << idtable.table[lextable.table[indOfFunc].idxTI].id << " PROC ";
				func = true;
				int backup = i;
				i++;
				/*while (lextable.table[i].lexema != LEX_RIGHTHESIS)
					i++;
				while (lextable.table[i].lexema != LEX_LEFTHESIS)
				{
					if (lextable.table[i].lexema == LEX_ID)
					{
						stackRet += 4;
						if (idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::STR)
						{
							out << idtable.table[lextable.table[i].idxTI].scope
								<< idtable.table[lextable.table[i].idxTI].id << ": DWORD";
						}
						else
						{
							out << idtable.table[lextable.table[i].idxTI].scope
								<< idtable.table[lextable.table[i].idxTI].id << ": SWORD";
						}
					}
					if (lextable.table[i].lexema == LEX_COMMA)
						out << ", ";
					i--;
				}*/
				
				while (lextable.table[i].lexema != LEX_LEFTHESIS)
					i++;
				while (lextable.table[i].lexema != LEX_RIGHTHESIS)
				{
					if (lextable.table[i].lexema == LEX_ID)
					{
						stackRet += 4;
						if (idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::STR)
							out << idtable.table[lextable.table[i].idxTI].scope
							<< idtable.table[lextable.table[i].idxTI].id << ": DWORD";
						else
							out << idtable.table[lextable.table[i].idxTI].scope
							<< idtable.table[lextable.table[i].idxTI].id << ": SWORD";
						if (lextable.table[i + 1].lexema == LEX_COMMA)
							out << ", ";
					}
					i++;
				}
				i = backup;
				out <<"\n" << std::endl;
				break;
			}
			case LEX_PROGRAM: {
				main = true;
				out << "main PROC\n";
				break;
			}
			case LEX_BRACELET: {
				if (flag_if && flag_else)
				{
					flag_if = false;
					out << "\tjmp\t\tIFOUT" << Ifsn << "\n";
					out << "FALSE" << Ifsn << ": " << "\n";
				}
				else if (flag_if) {
					flag_if = false;
					
					out << "FALSE" << Ifsn << ": " << "\n";
				}
				else if (flag_else && i!=lextable.size-1)//проверака если это не последний символ }
				{
					flag_else = false;
					out << "IFOUT" << Ifsn << ": " << "\n";
				}
				else if (flag_round)
				{
					flag_round = false;
					out << "\tjmp\t\tROUND" << num_of_round;
					out << "\n\tROUNDOUT" << num_of_round << ":\n";
				}
				else if (func)
				{
					out << "\n\n" << idtable.table[lextable.table[indOfFunc].idxTI].id << " ENDP\n\n";
					func = false;
					indOfFunc = 0;
				}
				else
				{
					out << "\n\tpush\t\t0\n";
					out << "\tcall\t\tExitProcess\nmain ENDP\n\n";
					indOfFunc = 0;
				}
				
				break;
			}
			 case LEX_RETRIEVE: {
				 if (main) {
					 out << "\tpush\t\t";
					 if (lextable.table[i + 1].lexema == LEX_ID) {
						 out << idtable.table[lextable.table[i + 1].idxTI].scope
							 << idtable.table[lextable.table[i + 1].idxTI].id;
					 }
					 else
						 out << idtable.table[lextable.table[i + 1].idxTI].id;
					 out << std::endl;
				 }
				 else
				 {
					 if (idtable.table[lextable.table[i + 1].idxTI].iddatatype == IT::IDDATATYPE::STR) {
						 if (idtable.table[lextable.table[i + 1].idxTI].idtype != IT::IDTYPE::L)
							 out << "\tmov\t\teax, " << idtable.table[lextable.table[i + 1].idxTI].scope
							 << idtable.table[lextable.table[i + 1].idxTI].id << "\n\tret\t\t" << stackRet << std::endl;
						 else
							 out << "\tmov\t\teax, offset " << idtable.table[lextable.table[i + 1].idxTI].id << "\n\tret\t\t" << stackRet << std::endl;
					 }
					 else if (idtable.table[lextable.table[i + 1].idxTI].iddatatype == IT::IDDATATYPE::VSH) {
						 if (idtable.table[lextable.table[i + 1].idxTI].idtype == IT::IDTYPE::L)
							 out << "\tmov\t\tax, " << idtable.table[lextable.table[i + 1].idxTI].id
							 << "\n\tret\t\t" << stackRet << std::endl;
						 else
							 out << "\tmov\t\tax, " << idtable.table[lextable.table[i + 1].idxTI].scope
							 << idtable.table[lextable.table[i + 1].idxTI].id << "\n\tret\t\t" << stackRet << std::endl;
					 }
					 else {
						 if (idtable.table[lextable.table[i + 1].idxTI].idtype == IT::IDTYPE::L)
							 out << "\tmov\t\tax, " << idtable.table[lextable.table[i + 1].idxTI].id
							 << "\n\tret\t\t" << stackRet << std::endl;
						 else
							 out << "\tmov\t\tax, " << idtable.table[lextable.table[i + 1].idxTI].scope
							 << idtable.table[lextable.table[i + 1].idxTI].id << "\n\tret\t\t" << stackRet << std::endl;
					 }
					 stackRet = 0;
				 }
				 break;
			 }
			 case LEX_OUTPUTS: {
				 int output_pos = i;
				 while (lextable.table[i].lexema != LEX_SEMICOLON)
				 {
					 if (lextable.table[i].lexema == LEX_COMMERCIALAT)
						 flag_com = true;
					 else if (lextable.table[i].lexema == LEX_ID && idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::F)
						 flag_com = true;

					 if (lextable.table[i].lexema == LEX_COMMERCIALAT)
					 {
						 IT::IDDATATYPE func_datatype = idtable.table[lextable.table[i].idxTI].iddatatype;
						 count_of_parameters = (int)lextable.table[i + 1].lexema;
						 int save_position = i;
						 int counter = 0;
						 while (counter < count_of_parameters)
						 {
							 i--;
							 if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::V)
							 {
								 if (idtable.table[lextable.table[i].idxTI].iddatatype != IT::IDDATATYPE::STR)
								 {
									 out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].scope
										 << idtable.table[lextable.table[i].idxTI].id << "\n";
									 out << "\tpush eax\n";
								 }
								 else
								 {
									 out << "\tpush\t " << idtable.table[lextable.table[i].idxTI].scope
										 << idtable.table[lextable.table[i].idxTI].id << "\n";
								 }

								 /*out << "\tpush dword ptr\n" << idtable.table[lextable.table[i].idxTI].scope
									 << idtable.table[lextable.table[i].idxTI].id << "\n";*/

							 }
							 else if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::P)
							 {
								 if (idtable.table[lextable.table[i].idxTI].iddatatype != IT::IDDATATYPE::STR)
								 {
									 out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].scope
										 << idtable.table[lextable.table[i].idxTI].id << "\n";
									 out << "\tpush eax\n";
								 }
								 else
								 {
									 out << "\tpush\t " << idtable.table[lextable.table[i].idxTI].scope
										 << idtable.table[lextable.table[i].idxTI].id << "\n";
								 }
								 /*out << "\tpush dword ptr\n" << idtable.table[lextable.table[i].idxTI].scope
									 << idtable.table[lextable.table[i].idxTI].id << "\n";*/
							 }
							 else if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::L)
							 {
								 if (idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::VSH
									 || idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::BOL)
								 {
									 out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].id << "\n";
									 out << "\tpush eax\n";
								 }
								 else
								 {
									 out << "\tpush\t\toffset ";
									 out << idtable.table[lextable.table[i].idxTI].id << "\n";
								 }
							 }
							 counter++;
						 }
						 i = save_position;
						 out << "\tcall\t\t" << idtable.table[lextable.table[i].idxTI].id << "\n";
						 if (func_datatype == IT::IDDATATYPE::STR)
						 {
							 out << "\tpush\t\teax\n";
							 out << "\n\tcall\t\tOutStringL\n\n";
						 }
						 else
							 out << "\tpush\t\tax\n";
						 if (func_datatype == IT::IDDATATYPE::VSH)
							 out << "\n\tcall\t\tOutVShortL\n\n";
						 else if (func_datatype == IT::IDDATATYPE::BOL)
							 out << "\n\tcall\t\tOutBooleanL\n\n";
					 }

					 i++;
				 }
				 /*if (flag_com)
				 {
					 i = output_pos;

				 }*/

				 /*if (lextable.table[i - 2].lexema == LEX_COMMERCIALAT ) {
					 if (idtable.table[lextable.table[i - 2].idxTI].iddatatype == IT::IDDATATYPE::VSH) {
						 out << "\n\tcall\t\tOutVShort\n\n";
					 }
					 else if (idtable.table[lextable.table[i - 2].idxTI].iddatatype == IT::IDDATATYPE::BOL) {
						 out << "\n\tcall\t\tOutBoolean\n\n";
					 }
					 else {
						 out << "\n\tcall\t\tOutString\n\n";
					 }
				 }*/
				 if (!flag_com)
				 {
					 if (lextable.table[output_pos + 1].lexema == LEX_ID) {
						 if (idtable.table[lextable.table[output_pos + 1].idxTI].iddatatype == IT::IDDATATYPE::VSH) {
							 if (lextable.table[output_pos + 1].sign == '-')
							 {
								 out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].scope
									 << idtable.table[lextable.table[output_pos + 1].idxTI].id;
								 out << "\n\tpop\t\tax\n";
								 out << "\tneg\t\tax\n";
								 out << "\tpush\t\tax\n";
							 }
							 else
								 out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].scope
								 << idtable.table[lextable.table[output_pos + 1].idxTI].id;
							 out << "\n\tcall\t\tOutVShortL\n\n";
						 }
						 else if (idtable.table[lextable.table[output_pos + 1].idxTI].iddatatype == IT::IDDATATYPE::BOL) {
							 out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].scope
								 << idtable.table[lextable.table[output_pos + 1].idxTI].id;
							 out << "\n\tcall\t\tOutBooleanL\n\n";
						 }
						 else {
							 out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].scope
								 << idtable.table[lextable.table[output_pos + 1].idxTI].id;
							 out << "\n\tcall\t\tOutStringL\n\n";
						 }
					 }
					 else if (lextable.table[output_pos + 1].lexema == LEX_LITERAL) {
						 if (idtable.table[lextable.table[output_pos + 1].idxTI].iddatatype == IT::IDDATATYPE::VSH) {
							 if (lextable.table[output_pos + 1].sign == '-')
							 {
								 out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].id;
								 out << "\n\tpop\t\tax\n";
								 out << "\tneg\t\tax\n";
								 out << "\tpush\t\tax\n";
							 }
							 else
								 out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].id;

							 out << "\n\tcall\t\tOutVShortL\n\n";
						 }
						 else if (idtable.table[lextable.table[output_pos + 1].idxTI].iddatatype == IT::IDDATATYPE::BOL) {
							 out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].id;
							 out << "\n\tcall\t\tOutBooleanL\n\n";
						 }
						 else {
							 out << "\tpush\t\toffset " << idtable.table[lextable.table[output_pos + 1].idxTI].id;
							 out << "\n\tcall\t\tOutStringL\n\n";
						 }
					 }
				 }
				 flag_com = false;
				 break;
			 }
			case LEX_OUTPUT: {
				int output_pos = i;
 				while (lextable.table[i].lexema != LEX_SEMICOLON)
				{
					if ( lextable.table[i].lexema == LEX_COMMERCIALAT)
						flag_com = true;
					else if(lextable.table[i].lexema == LEX_ID && idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::F )
						flag_com = true;

					if (lextable.table[i].lexema == LEX_COMMERCIALAT)
					{
						IT::IDDATATYPE func_datatype = idtable.table[lextable.table[i].idxTI].iddatatype;
						count_of_parameters = (int)lextable.table[i + 1].lexema;
						int save_position = i;
						int counter = 0;
						while (counter < count_of_parameters)
						{
							i--;
							if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::V)
							{
								if (idtable.table[lextable.table[i].idxTI].iddatatype != IT::IDDATATYPE::STR)
								{
									out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].scope
										<< idtable.table[lextable.table[i].idxTI].id << "\n";
									out << "\tpush eax\n";
								}
								else
								{
									out << "\tpush\t " << idtable.table[lextable.table[i].idxTI].scope
										<< idtable.table[lextable.table[i].idxTI].id << "\n";
								}

								/*out << "\tpush dword ptr\n" << idtable.table[lextable.table[i].idxTI].scope
									<< idtable.table[lextable.table[i].idxTI].id << "\n";*/

							}
							else if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::P)
							{
								if (idtable.table[lextable.table[i].idxTI].iddatatype != IT::IDDATATYPE::STR)
								{
									out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].scope
										<< idtable.table[lextable.table[i].idxTI].id << "\n";
									out << "\tpush eax\n";
								}
								else
								{
									out << "\tpush\t " << idtable.table[lextable.table[i].idxTI].scope
										<< idtable.table[lextable.table[i].idxTI].id << "\n";
								}
								/*out << "\tpush dword ptr\n" << idtable.table[lextable.table[i].idxTI].scope
									<< idtable.table[lextable.table[i].idxTI].id << "\n";*/
							}
							else if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::L)
							{
								if (idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::VSH
									|| idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::BOL)
								{
									out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].id << "\n";
									out << "\tpush eax\n";
								}
								else
								{
									out << "\tpush\t\toffset ";
									out << idtable.table[lextable.table[i].idxTI].id << "\n";
								}
							}
							counter++;
						}
						i = save_position;
						out << "\tcall\t\t" << idtable.table[lextable.table[i].idxTI].id << "\n";
						
						if (func_datatype == IT::IDDATATYPE::STR)
						{
							out << "\tpush\t\teax\n";
							out << "\n\tcall\t\tOutString\n\n";
						}
						else
						{
							out << "\tpush\t\tax\n";
						}
						if(func_datatype == IT::IDDATATYPE::VSH)
							out << "\n\tcall\t\tOutVShort\n\n";
						else if (func_datatype == IT::IDDATATYPE::BOL)
							out << "\n\tcall\t\tOutBoolean\n\n";

					}

					i++;
				}
				/*if (flag_com)
				{
					i = output_pos;
					
				}*/

				/*if (lextable.table[i - 2].lexema == LEX_COMMERCIALAT ) {
					if (idtable.table[lextable.table[i - 2].idxTI].iddatatype == IT::IDDATATYPE::VSH) {
						out << "\n\tcall\t\tOutVShort\n\n";
					}
					else if (idtable.table[lextable.table[i - 2].idxTI].iddatatype == IT::IDDATATYPE::BOL) {
						out << "\n\tcall\t\tOutBoolean\n\n";
					}
					else {
						out << "\n\tcall\t\tOutString\n\n";
					}
				}*/
				if (!flag_com)
				{
					if (lextable.table[output_pos + 1].lexema == LEX_ID) {
						if (idtable.table[lextable.table[output_pos + 1].idxTI].iddatatype == IT::IDDATATYPE::VSH) {
							if (lextable.table[output_pos + 1].sign == '-')
							{
								out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].scope
									<< idtable.table[lextable.table[output_pos + 1].idxTI].id;
								out << "\n\tpop\t\tax\n";
								out << "\tneg\t\tax\n";
								out << "\tpush\t\tax\n";
							}
							else
								out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].scope
								<< idtable.table[lextable.table[output_pos + 1].idxTI].id;
							out << "\n\tcall\t\tOutVShort\n\n";
						}
						else if (idtable.table[lextable.table[output_pos + 1].idxTI].iddatatype == IT::IDDATATYPE::BOL) {
							out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].scope
								<< idtable.table[lextable.table[output_pos + 1].idxTI].id;
							out << "\n\tcall\t\tOutBoolean\n\n";
						}
						else {
							out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].scope
								<< idtable.table[lextable.table[output_pos + 1].idxTI].id;
							out << "\n\tcall\t\tOutString\n\n";
						}
					}
					else if (lextable.table[output_pos + 1].lexema == LEX_LITERAL) {
						if (idtable.table[lextable.table[output_pos + 1].idxTI].iddatatype == IT::IDDATATYPE::VSH) {
							if (lextable.table[output_pos + 1].sign == '-')
							{
								out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].id;
								out << "\n\tpop\t\tax\n";
								out << "\tneg\t\tax\n";
								out << "\tpush\t\tax\n";
							}
							else
								out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].id;

							out << "\n\tcall\t\tOutVShort\n\n";
						}
						else if (idtable.table[lextable.table[output_pos + 1].idxTI].iddatatype == IT::IDDATATYPE::BOL) {
							out << "\tpush\t\t" << idtable.table[lextable.table[output_pos + 1].idxTI].id;
							out << "\n\tcall\t\tOutBoolean\n\n";
						}
						else {
							out << "\tpush\t\toffset " << idtable.table[lextable.table[output_pos + 1].idxTI].id;
							out << "\n\tcall\t\tOutString\n\n";
						}
					}
				}
				flag_com = false;
				break;
			}
			case LEX_EQUALS: {
				indOflex = i - 1;
				int counter_parameters;
				int position_func_parameters = 0;;
				int save_pos = i;
				while (lextable.table[i].lexema != LEX_SEMICOLON) {
					if (lextable.table[i].lexema == LEX_COMMERCIALAT)
					{
						flag_com = true;
						array_of_parameters_positions[index++] = i - (int)lextable.table[i+1].lexema;
					}
					i++;
				}
				index = 0;
				i = save_pos;
				while (lextable.table[i].lexema != LEX_SEMICOLON) 
				{
					if (i == array_of_parameters_positions[index])
					{
						index++;
						while (lextable.table[i].lexema != LEX_COMMERCIALAT)
							i++;
					}
					if (lextable.table[i].lexema == LEX_ID) {
						/*if (func)
						{*/
						if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::V)
						{
							out << "\tpush\t\t" << idtable.table[lextable.table[i].idxTI].scope
								<< idtable.table[lextable.table[i].idxTI].id << "\n";
						}
						else if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::P)
						{
							out << "\tpush\t\t" << idtable.table[lextable.table[i].idxTI].scope
								<< idtable.table[lextable.table[i].idxTI].id << "\n";
						}
					}
						//}
						//else
						//{
						//	if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::V)
						//	{
						//		out << "\movsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].scope
						//			<< idtable.table[lextable.table[i].idxTI].id << "\n";
						//		out << "\tpush eax\n";
						//		/*out << "\tpush\t\t" << idtable.table[lextable.table[i].idxTI].scope
						//			<< idtable.table[lextable.table[i].idxTI].id << "\n";*/
						//			/*	if (!func)
						//			else
						//				out << "\tpush\t\t" << idtable.table[lextable.table[i].idxTI].id << "\n";*/
						//	}
						//	else if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::P)
						//	{
						//		out << "\movsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].scope
						//			<< idtable.table[lextable.table[i].idxTI].id << "\n";
						//		out << "\tpush eax\n";
								/*out << "\tpush\t\t" << idtable.table[lextable.table[i].idxTI].scope
									<< idtable.table[lextable.table[i].idxTI].id << "\n";*/
									/*	if (!func)
									else
										out << "\tpush\t\t" << idtable.table[lextable.table[i].idxTI].id << "\n";*/
						/*	}
						}*/
					if (lextable.table[i].lexema == LEX_LITERAL /*&& i != position_func_parameters*/)
					{
						/*if (func) {*/
							if (idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::VSH
								|| idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::BOL)
							{
								out << "\tpush\t\t";
							}
							else
							{
								out << "\tpush\t\toffset ";
							}
							out << idtable.table[lextable.table[i].idxTI].id << "\n";
							//	out << "\tpush\t\toffset ";
							//out << idtable.table[lextable.table[i].idxTI].id << "\n";
						//}
						//else
						//{
						//	if (idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::VSH 
						//		|| idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::BOL)
						//	{
						//		out << "\movsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].scope
						//			<< idtable.table[lextable.table[i].idxTI].id << "\n";
						//		out << "\tpush eax\n";
						//		/*out << "\tpush\t\t";*/
						//	}
						//	else
						//	{
						//		out << "\tpush\t\toffset ";
						//		out << idtable.table[lextable.table[i].idxTI].id << "\n";
						//	}
						//	//	out << "\tpush\t\toffset ";
						//	//out << idtable.table[lextable.table[i].idxTI].id << "\n";
						//}
					}
					if (lextable.table[i].lexema == LEX_COMMERCIALAT)
					{
						count_of_parameters = (int)lextable.table[i + 1].lexema;
						int save_position = i;
						int counter = 0;
						while (counter < count_of_parameters)
						{
							i--;
							if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::V)
							{
								if (idtable.table[lextable.table[i].idxTI].iddatatype != IT::IDDATATYPE::STR)
								{
									out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].scope
										<< idtable.table[lextable.table[i].idxTI].id << "\n";
									out << "\tpush eax\n";
								}
								else
								{
									out <<  "\tpush\t " << idtable.table[lextable.table[i].idxTI].scope
										<< idtable.table[lextable.table[i].idxTI].id << "\n";
								}
							
								/*out << "\tpush dword ptr\n" << idtable.table[lextable.table[i].idxTI].scope
									<< idtable.table[lextable.table[i].idxTI].id << "\n";*/
								
							}
							else if (idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::P)
							{
								if (idtable.table[lextable.table[i].idxTI].iddatatype != IT::IDDATATYPE::STR)
								{
									out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].scope
										<< idtable.table[lextable.table[i].idxTI].id << "\n";
									out << "\tpush eax\n";
								}
								else
								{
									out << "\tpush\t " << idtable.table[lextable.table[i].idxTI].scope
										<< idtable.table[lextable.table[i].idxTI].id << "\n";
								}
								/*out << "\tpush dword ptr\n" << idtable.table[lextable.table[i].idxTI].scope
									<< idtable.table[lextable.table[i].idxTI].id << "\n";*/
							}
							else if(idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::L)
							{
								if (idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::VSH
									|| idtable.table[lextable.table[i].idxTI].iddatatype == IT::IDDATATYPE::BOL)
								{
									out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[i].idxTI].id << "\n";
									out << "\tpush eax\n";
								}
								else
								{
									out << "\tpush\t\toffset ";
									out << idtable.table[lextable.table[i].idxTI].id << "\n";
								}
							}
							counter++;
						}
						i = save_position;
						out << "\tcall\t\t" << idtable.table[lextable.table[i].idxTI].id << "\n";
						out << "\tpush\t\tax\n";
						
					}
					if (lextable.table[i].operation == LT::OPER::PLUS && lextable.table[i-1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tax\n";
						out << "\tpop\t\tbx\n";
						out << "\tcwd\n";
						out << "\tadd\t\tax, bx\n";
						out << "\tpush\t\tax\n";
						out << "\n";
					}
					if (lextable.table[i].operation == LT::OPER::NOT && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tax\n";
						out << "\tneg\t\tax\n";
						out << "\tpush\t\tax\n";
						out << "\n";
					}
					if (lextable.table[i].operation == LT::OPER::MINUS && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tbx\n";
						out << "\tpop\t\tax\n";
						out << "\tsub\t\tax, bx\n";
						out << "\tpush\t\tax\n";
						out << "\n";
					}
					if (lextable.table[i].operation == LT::OPER::MUL && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tax\n";
						out << "\tpop\t\tbx\n";
						out << "\tcwd\n";
						out << "\timul\t\tbx\n";
						out << "\tpush\t\tax\n";
						out << "\n";
					}
					if (lextable.table[i].operation == LT::OPER::DIV && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tbx\n";
						out << "\tpop\t\tax\n";
						out << "\tcwd\n";
						out << "\tidiv\t\tbx\n";
						out << "\tpush\t\tax\n";
						out << "\n";
					}
					if (lextable.table[i].operation == LT::OPER::PERC && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tbx\n";
						out << "\tpop\t\tax\n";
						out << "\tcwd\n";
						out << "\tidiv\t\tbx\n";
						out << "\tpush\t\tdx\n";

						out << "\n";
					}
					if (lextable.table[i].operation == LT::OPER::MORE && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tbx\n";
						out << "\tpop\t\tax\n";
						out << "\tcmp\t\tax,bx\n";
						out << "\tjg\t\tMORE" << num_of_points << "\n";
						out << "\tjl\t\tLESS" << num_of_points << "\n";
						out << "\tje\t\tLESS" << num_of_points << "\n";

						/*lextable.table[i].sn
							lextable.table[i].sn
							lextable.table[i].sn*/
						

						out << "MORE" << num_of_points << ":" << "\n";// lextable.table[i].sn << ":" << "\n";
						out << "\tsub ax,ax\n\tadd ax,1\n\tpush ax\n";
						out << "\tjmp\t\tMOREOUT" << num_of_points << "\n";//lextable.table[i].sn << "\n";

						out << "LESS" << num_of_points << ":\n"; //lextable.table[i].sn << ":\n";
						out << "\tsub ax,ax\n\tpush ax\n";
						out << "\tjmp\t\tMOREOUT" << num_of_points << "\n";// << lextable.table[i].sn << "\n";

						out << "MOREOUT" << num_of_points << ":\n";//lextable.table[i].sn << ":\n";
						out << "\n";

						num_of_points++;
					}

					if (lextable.table[i].operation == LT::OPER::LESS && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tbx\n";
						out << "\tpop\t\tax\n";
						out << "\tcmp\t\tax,bx\n";

						/*out << "\tjg\t\tMORE" << lextable.table[i].sn << "\n";
						out << "\tjl\t\tLESS" << lextable.table[i].sn << "\n";
						out << "\tje\t\tLESS" << lextable.table[i].sn << "\n";*/
						out << "\tjg\t\tMORE" << num_of_points << "\n";
						out << "\tjl\t\tLESS" << num_of_points << "\n";
						out << "\tje\t\tLESS" << num_of_points << "\n";


						out << "MORE" << num_of_points << ":" << "\n";// lextable.table[i].sn << ":" << "\n";
						out << "\tsub ax,ax\n\tpush ax\n";
						out << "\tjmp\t\tLESSOUT" << num_of_points << "\n";//lextable.table[i].sn << "\n";

						out << "LESS" << num_of_points << ":\n"; //lextable.table[i].sn << ":\n";
						out << "\tsub ax,ax\n\tadd ax,1\n\tpush ax\n";
						out << "\tjmp\t\tLESSOUT" << num_of_points << "\n";// << lextable.table[i].sn << "\n";

						out << "LESSOUT" << num_of_points << ":\n";//lextable.table[i].sn << ":\n";
						out << "\n";
						num_of_points++;
					}

					if (lextable.table[i].operation == LT::OPER::EQU && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";

						out << "\tpop\t\tbx\n";
						out << "\tpop\t\tax\n";
						out << "\tcmp\t\tax, bx\n";

						out << "\tje\t\tEQUAL" << num_of_points << "\n";/* << lextable.table[i].sn << "\n";*/
						out << "\tjne\t\tNOTEQUAL" << num_of_points << "\n";/* << lextable.table[i].sn << "\n";*/

						out << "EQUAL" << num_of_points << ":" << "\n"; //<< lextable.table[i].sn << ":" << "\n";
						out << "\tsub ax,ax\n\tadd ax,1\n\tpush ax\n";
						out << "\tjmp\t\tEQUOUT" << num_of_points << "\n"; /*<< lextable.table[i].sn << "\n";*/

						out << "NOTEQUAL" << num_of_points << ":" << "\n";/*<< lextable.table[i].sn << ":" << "\n";*/
						out << "\tsub ax,ax\n\tpush ax\n";
						out << "\tjmp\t\tEQUOUT" << num_of_points << "\n";//<< lextable.table[i].sn << "\n";

						out << "EQUOUT" << num_of_points << ":" << "\n";//<< lextable.table[i].sn << ":\n";
						out << "\n";
						num_of_points++;
					}

					if (lextable.table[i].operation == LT::OPER::NOTEQU && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";

						out << "\tpop\t\tbx\n";
						out << "\tpop\t\tax\n";
						out << "\tcmp\t\tax, bx\n";

						out << "\tje\t\tEQUAL"	   << num_of_points << "\n"; //<< lextable.table[i].sn << "\n";
						out << "\tjne\t\tNOTEQUAL" << num_of_points << "\n"; //<< lextable.table[i].sn << "\n";

						out << "EQUAL" << num_of_points << ":" << "\n";// << lextable.table[i].sn << ":" << "\n";
						out << "\tsub ax,ax\n\tpush ax\n";
						out << "\tjmp\t\tNOTEQUOUT" << num_of_points << "\n";//<< lextable.table[i].sn << "\n";

						out << "NOTEQUAL" << num_of_points << ":" << "\n";/*<< lextable.table[i].sn << ":" << "\n";*/
						out << "\tsub ax,ax\n\tadd ax,1\n\tpush ax\n";
						out << "\tjmp\t\tNOTEQUOUT" << num_of_points << "\n";//<< lextable.table[i].sn << "\n";

						out << "NOTEQUOUT" << num_of_points << ":" << "\n";//<< lextable.table[i].sn << ":\n";
						out << "\n";
						num_of_points++;
					}

					if (lextable.table[i].operation == LT::OPER::MOREOREQU && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tbx\n";
						out << "\tpop\t\tax\n";
						out << "\tcmp\t\tax, bx\n";

						out << "\tjge\t\tMOREOREQUAL" << num_of_points << "\n";// << lextable.table[i].sn << "\n";
						out << "\tjl\t\tLESS"	      << num_of_points << "\n";// << lextable.table[i].sn << "\n";

						out << "MOREOREQUAL" << num_of_points << ":" << "\n"; //<< lextable.table[i].sn << ":" << "\n";
						out << "\tsub ax,ax\n\tadd ax,1\n\tpush ax\n";
						out << "\tjmp\t\tMOREOREQUALOUT" << num_of_points << "\n";//<< lextable.table[i].sn << "\n";

						out << "LESS" << num_of_points << ":" << "\n";//<< lextable.table[i].sn << ":" << "\n";
						out << "\tsub ax,ax\n\tpush ax\n";
						out << "\tjmp\t\tMOREOREQUALOUT" << num_of_points << "\n";// << lextable.table[i].sn << "\n";

						out << "MOREOREQUALOUT" << num_of_points << ":" << "\n"; //<< lextable.table[i].sn << ":\n";
						out << "\n";
						num_of_points++;
					}

					if (lextable.table[i].operation == LT::OPER::LESSOREQU && lextable.table[i - 1].lexema != LEX_COMMERCIALAT)
					{
						out << "\n";
						out << "\tpop\t\tbx\n";
						out << "\tpop\t\tax\n";
						out << "\tcmp\t\tax, bx\n";

						out << "\tjg\t\tMORE"         << num_of_points << "\n";//<< lextable.table[i].sn << "\n";
						out << "\tjle\t\tLESSOREQUAL" << num_of_points << "\n";//<< lextable.table[i].sn << "\n";

						out << "MORE" << num_of_points << ":" << "\n";//<< lextable.table[i].sn << ":" << "\n";
						out << "\tsub ax,ax\n\tpush ax\n";
						out << "\tjmp\t\tLESSOREQUALOUT" << num_of_points << "\n";//<< lextable.table[i].sn << "\n";

						out << "LESSOREQUAL" << num_of_points << ":" << "\n";/*<< lextable.table[i].sn << ":" << "\n";*/
						out << "\tsub ax,ax\n\tadd ax,1\n\tpush ax\n";
						out << "\tjmp\t\tLESSOREQUALOUT" << num_of_points << "\n";//<< lextable.table[i].sn << "\n";

						out << "LESSOREQUALOUT" << num_of_points << ":" << "\n";//<< lextable.table[i].sn << ":\n";
						out << "\n";
						num_of_points++;
					}

					i++;
				}
				out << "\tpop\t\t\t" << idtable.table[lextable.table[indOflex].idxTI].scope
					<< idtable.table[lextable.table[indOflex].idxTI].id << "\n\n";
				flag_com = false;
				break;
			}

			case LEX_IF: {
				flag_if = true;
				flagelse = 0;
				operation = ' ';
				if (lextable.table[i + 2].lexema != LEX_LITERAL && (idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::V ||
					idtable.table[lextable.table[i+2].idxTI].idtype == IT::IDTYPE::P) && lextable.table[i + 3].lexema == LEX_RIGHTHESIS && 
					idtable.table[lextable.table[i + 2].idxTI].iddatatype == IT::IDDATATYPE::BOL)
				{
					out << "\tpush\t\t" << idtable.table[lextable.table[i+2].idxTI].scope << idtable.table[lextable.table[i + 2].idxTI].id << "\n";

					out << "\tpop\t\tax\n";
					out << "\tmov\t\tbx, 0\n";
					out << "\tcmp\t\tax, bx\n";
					Ifsn = lextable.table[i].sn;
					int j = i;
					while (lextable.table[j].lexema != LEX_BRACELET)
						j++;
					if (lextable.table[j + 1].lexema == LEX_ELSE)
						flag_else = true;

					out << "\tjz\t\tFALSE" << Ifsn << "\n";
				}
				else if (lextable.table[i + 2].lexema != LEX_LITERAL && idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::F &&
					idtable.table[lextable.table[i + 2].idxTI].iddatatype == IT::IDDATATYPE::BOL)
				{
					int backup = i;
					int start_pos = i + 2;
					while (lextable.table[start_pos].lexema!= LEX_RIGHTHESIS)
					{
						if (idtable.table[lextable.table[start_pos].idxTI].idtype == IT::IDTYPE::V)
						{
							if (idtable.table[lextable.table[start_pos].idxTI].iddatatype != IT::IDDATATYPE::STR)
							{
								out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[start_pos].idxTI].scope
									<< idtable.table[lextable.table[start_pos].idxTI].id << "\n";
								out << "\tpush eax\n";
							}
							else
							{
								out << "\tpush\t " << idtable.table[lextable.table[start_pos].idxTI].scope
									<< idtable.table[lextable.table[start_pos].idxTI].id << "\n";
							}
						}
						else if (idtable.table[lextable.table[start_pos].idxTI].idtype == IT::IDTYPE::P)
						{
							if (idtable.table[lextable.table[start_pos].idxTI].iddatatype != IT::IDDATATYPE::STR)
							{
								out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[start_pos].idxTI].scope
									<< idtable.table[lextable.table[start_pos].idxTI].id << "\n";
								out << "\tpush eax\n";
							}
							else
							{
								out << "\tpush\t " << idtable.table[lextable.table[start_pos].idxTI].scope
									<< idtable.table[lextable.table[start_pos].idxTI].id << "\n";
							}
						}
						else if (idtable.table[lextable.table[start_pos].idxTI].idtype == IT::IDTYPE::L)
						{
							if (idtable.table[lextable.table[start_pos].idxTI].iddatatype == IT::IDDATATYPE::VSH
								|| idtable.table[lextable.table[start_pos].idxTI].iddatatype == IT::IDDATATYPE::BOL)
							{
								out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[start_pos].idxTI].id << "\n";
								out << "\tpush eax\n";
							}
							else
							{
								out << "\tpush\t\toffset ";
								out << idtable.table[lextable.table[start_pos].idxTI].id << "\n";
							}
						}
						start_pos++;
					}

					out << "\tcall\t\t" << idtable.table[lextable.table[i+2].idxTI].id << "\n";
					out << "\tpush\t\tax\n";

					out << "\tpop\t\tax\n";
					out << "\tmov\t\tbx, 0\n";
					out << "\tcmp\t\tax, bx\n";
					Ifsn = lextable.table[i].sn;
					int j = i;
					while (lextable.table[j].lexema != LEX_BRACELET)
						j++;
					if (lextable.table[j + 1].lexema == LEX_ELSE)
						flag_else = true;

					out << "\tjz\t\tFALSE" << Ifsn << "\n";
				}
				else if ((lextable.table[i + 2].lexema == LEX_LITERAL && idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::L) &&
					(lextable.table[i + 3].lexema == LEX_RIGHTHESIS) && idtable.table[lextable.table[i + 2].idxTI].iddatatype == IT::IDDATATYPE::BOL) {
					out << "\tpush\t\t" << idtable.table[lextable.table[i + 2].idxTI].id << "\n";
					
					out << "\tpop\t\tax\n";
					out << "\tmov\t\tbx, 0\n";
					out << "\tcmp\t\tax, bx\n";
					Ifsn = lextable.table[i].sn;
					int j = i;
					while (lextable.table[j].lexema != LEX_BRACELET)
						j++;
					if (lextable.table[j + 1].lexema == LEX_ELSE)
						flag_else = true;

					out << "\tjz\t\tFALSE" << Ifsn << "\n";
				}
				else {
					if (lextable.table[i + 2].lexema != LEX_LITERAL && idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::V)
						out << "\tpush\t\t" << idtable.table[lextable.table[i + 2].idxTI].scope << idtable.table[lextable.table[i + 2].idxTI].id << "\n";
					else
						out << "\tpush\t\t" << idtable.table[lextable.table[i + 2].idxTI].id << "\n";

					if (lextable.table[i + 4].lexema != LEX_LITERAL && idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::V)
						out << "\tpush\t\t" << idtable.table[lextable.table[i + 4].idxTI].scope << idtable.table[lextable.table[i + 4].idxTI].id << "\n";
					else
						out << "\tpush\t\t" << idtable.table[lextable.table[i + 4].idxTI].id << "\n";

					out << "\tpop\t\tbx\n";
					out << "\tpop\t\tax\n";
					out << "\tcmp\t\tax, bx\n";
					Ifsn = lextable.table[i].sn;
					int j = i;
					while (lextable.table[j].lexema != LEX_BRACELET)
						j++;
					if (lextable.table[j + 1].lexema == LEX_ELSE)
						flag_else = true;
					switch (lextable.table[i + 3].operation) {

					case LT::OPER::EQU:
					{
						out << "\tjne\t\tFALSE" << Ifsn << "\n";
						if (flag_else) {
							out << "\tje\t\tTRUE" << Ifsn << "\n";
							operation = LEX_TILDE;
							out << "TRUE" << Ifsn << ": " << "\n";
						}
						break;	
					}

					case LT::OPER::NOTEQU:
					{
						out << "\tje\t\tFALSE" << Ifsn << "\n";
						if (flag_else) {
							out << "\tjne\t\tTRUE" << Ifsn << "\n";
							operation = LEX_EQUALS;
							out << "TRUE" << Ifsn << ": " << "\n";
						}
						break;
					}

					case LT::OPER::MORE:
					{
						out << "\tjl\t\tFALSE" << Ifsn << "\n";
						out << "\tje\t\tFALSE" << Ifsn << "\n";
						if (flag_else) {
							out << "\tjg\t\tTRUE" << Ifsn << "\n";
							operation = LEX_MORE;
							out << "TRUE" << Ifsn << ": " << "\n";

						}
						break;
					}

					case LT::OPER::LESS:
					{
						out << "\tjg\t\tFALSE" << Ifsn << "\n";
						out << "\tje\t\tFALSE" << Ifsn << "\n";
						if (flag_else) {
							out << "\tjl\t\tTRUE" << Ifsn << "\n";
							operation = LEX_LESS;
							out << "TRUE" << Ifsn << ": " << "\n";
						}
						break;
					}

					case LT::OPER::MOREOREQU:
					{
						out << "\tjl\t\tFALSE" << Ifsn << "\n";
						if (flag_else) {
							out << "\tjge\t\tTRUE" << Ifsn << "\n";
							operation = LEX_MOREOREQUALS;
							out << "TRUE" << Ifsn << ": " << "\n";
						}
						break;
					}

					case LT::OPER::LESSOREQU:
					{
						out << "\tjg\t\tFALSE" << Ifsn << "\n";
						if (flag_else) {
							out << "\tjle\t\tTRUE" << Ifsn << "\n";
							operation = LEX_LESSOREQUALS;
							out << "TRUE" << Ifsn << ": " << "\n";
						}
						break;
					}
					default:break;
					}
				}
				break;
			}
			case LEX_ROUND:
			{
				flag_round = true;
				num_of_round = lextable.table[i + 2].sn;
				out << "\nROUND"<< num_of_round <<" :\n";
				if (lextable.table[i + 2].lexema != LEX_LITERAL && (idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::V ||
					idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::P) && lextable.table[i + 3].lexema == LEX_RIGHTHESIS &&
					idtable.table[lextable.table[i + 2].idxTI].iddatatype == IT::IDDATATYPE::BOL)
				{
					out << "\tpush\t\t" << idtable.table[lextable.table[i + 2].idxTI].scope << idtable.table[lextable.table[i + 2].idxTI].id << "\n";
					out << "\tpop\t\tax\n";
					out << "\tmov\t\tbx, 0\n";
					out << "\tcmp\t\tax, bx\n";
					Ifsn = lextable.table[i].sn;

					out << "\tjz\t\tROUNDOUT" << Ifsn << "\n";
				}
				else if (lextable.table[i + 2].lexema != LEX_LITERAL && idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::F &&
					idtable.table[lextable.table[i + 2].idxTI].iddatatype == IT::IDDATATYPE::BOL)
				{
					int backup = i;
					int start_pos = i + 2;
					while (lextable.table[start_pos].lexema != LEX_RIGHTHESIS)
					{
						if (idtable.table[lextable.table[start_pos].idxTI].idtype == IT::IDTYPE::V)
						{
							if (idtable.table[lextable.table[start_pos].idxTI].iddatatype != IT::IDDATATYPE::STR)
							{
								out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[start_pos].idxTI].scope
									<< idtable.table[lextable.table[start_pos].idxTI].id << "\n";
								out << "\tpush eax\n";
							}
							else
							{
								out << "\tpush\t " << idtable.table[lextable.table[start_pos].idxTI].scope
									<< idtable.table[lextable.table[start_pos].idxTI].id << "\n";
							}
						}
						else if (idtable.table[lextable.table[start_pos].idxTI].idtype == IT::IDTYPE::P)
						{
							if (idtable.table[lextable.table[start_pos].idxTI].iddatatype != IT::IDDATATYPE::STR)
							{
								out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[start_pos].idxTI].scope
									<< idtable.table[lextable.table[start_pos].idxTI].id << "\n";
								out << "\tpush eax\n";
							}
							else
							{
								out << "\tpush\t " << idtable.table[lextable.table[start_pos].idxTI].scope
									<< idtable.table[lextable.table[start_pos].idxTI].id << "\n";
							}
						}
						else if (idtable.table[lextable.table[start_pos].idxTI].idtype == IT::IDTYPE::L)
						{
							if (idtable.table[lextable.table[start_pos].idxTI].iddatatype == IT::IDDATATYPE::VSH
								|| idtable.table[lextable.table[start_pos].idxTI].iddatatype == IT::IDDATATYPE::BOL)
							{
								out << "\tmovsx\t" << "eax, " << idtable.table[lextable.table[start_pos].idxTI].id << "\n";
								out << "\tpush eax\n";
							}
							else
							{
								out << "\tpush\t\toffset ";
								out << idtable.table[lextable.table[start_pos].idxTI].id << "\n";
							}
						}
						start_pos++;
					}

					out << "\tcall\t\t" << idtable.table[lextable.table[i + 2].idxTI].id << "\n";
					out << "\tpush\t\tax\n";

					out << "\tpop\t\tax\n";
					out << "\tmov\t\tbx, 0\n";
					out << "\tcmp\t\tax, bx\n";
					Ifsn = lextable.table[i].sn;

					out << "\tjz\t\tROUNDOUT" << Ifsn << "\n";
				}
				else {
					if (lextable.table[i + 2].lexema != LEX_LITERAL && idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::V)
						out << "\tpush\t\t" << idtable.table[lextable.table[i + 2].idxTI].scope << idtable.table[lextable.table[i + 2].idxTI].id << "\n";
					else
						out << "\tpush\t\t" << idtable.table[lextable.table[i + 2].idxTI].id << "\n";

					if (lextable.table[i + 4].lexema != LEX_LITERAL && idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::V)
						out << "\tpush\t\t" << idtable.table[lextable.table[i + 4].idxTI].scope << idtable.table[lextable.table[i + 4].idxTI].id << "\n";
					else
						out << "\tpush\t\t" << idtable.table[lextable.table[i + 4].idxTI].id << "\n";

					out << "\tpop\t\tbx\n";
					out << "\tpop\t\tax\n";
					out << "\tcmp\t\tax, bx\n";
					Ifsn = lextable.table[i].sn;

					switch (lextable.table[i + 3].operation) {

					case LT::OPER::EQU:
					{
						out << "\tjne\t\tROUNDOUT" << Ifsn << "\n";
						break;
					}

					case LT::OPER::NOTEQU:
					{
						out << "\tje\t\tROUNDOUT" << Ifsn << "\n";
						break;
					}

					case LT::OPER::MORE:
					{
						out << "\tjl\t\tROUNDOUT" << Ifsn << "\n";
						out << "\tje\t\tROUNDOUT" << Ifsn << "\n";
						break;
					}

					case LT::OPER::LESS:
					{
						out << "\tjnb\t\tROUNDOUT" << Ifsn << "\n";
						out << "\tje\t\tROUNDOUT" << Ifsn << "\n";
						break;
					}

					case LT::OPER::MOREOREQU:
					{
						out << "\tjb\t\tROUNDOUT" << Ifsn << "\n";
						break;
					}

					case LT::OPER::LESSOREQU:
					{
						out << "\tja\t\tROUNDOUT" << Ifsn << "\n";
						break;
					}
					default:break;
					}
				}
			}
			default:break;
			}
		}
		out << "\n\n" << "END main\n";

	}
};

	

		


	
