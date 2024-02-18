#include"LexAnalysis.h"
#include"FST.h"
#include"Errors.h"
using namespace std;

namespace Lex
{
	char /*void*/ ArrayOfTokens(const char* str)
	{
		/*bool fl = false;*/
		int ind = 0;
		FST::FST ArrayOfChains[] = {
			FST_VSHORT, FST_STRING, FST_BOOLEAN, FST_FUNCTION, FST_CONVERT, FST_LENGTH,
			FST_COMPARE, FST_OUTPUT,FST_OUTPUTS,FST_SET,
			FST_RETRIEVE, FST_PROGRAM, FST_PLUS, FST_MINUS, FST_MULTIPLICATION,
			FST_DIRSLASH, FST_PERCENT, FST_MORE, FST_LESS, FST_TILDE,
			FST_MOREOREQUALS, FST_LESSOREQUALS,
			FST_EXMARK, FST_LEFTTHESIS, FST_RIGHTTHESIS, FST_SEMICOLON, FST_COMMA,
			FST_LEFTBRACE, FST_BRACELET, FST_EQUALS, FST_IF, FST_ELSE,FST_ROUND,
			FST_TRUE, FST_FALSE,FST_VSHORT_LITERAL , FST_STRING_LITERAL,FST_ID
		};
		const int size = sizeof(ArrayOfChains) / sizeof(ArrayOfChains[0]);
		const char Tokens[] = {
			LEX_VSHORT,LEX_STRING,LEX_BOOLEAN,LEX_FUNCTION,LEX_CONVERT,LEX_LENGTH,
			LEX_COMPARE,LEX_OUTPUT,LEX_OUTPUTS,LEX_SET,
			LEX_RETRIEVE,LEX_PROGRAM,LEX_PLUS,LEX_MINUS,LEX_STAR,
			LEX_DIRSLASH,LEX_PERCENT,LEX_MORE,LEX_LESS,LEX_TILDE,
			LEX_MOREOREQUALS, LEX_LESSOREQUALS,
			LEX_EXMARK,LEX_LEFTHESIS,LEX_RIGHTHESIS,LEX_SEMICOLON,LEX_COMMA,
			LEX_LEFTBRACE,LEX_BRACELET,LEX_EQUALS,LEX_IF,LEX_ELSE,LEX_ROUND,
			LEX_TRUE,LEX_FALSE,LEX_VSHORT_LITERAL ,LEX_STRING_LITERAL,LEX_ID
		};																	
		for (int i = 0; i < size; i++)
		{
			if (execute(str, ArrayOfChains[i])) {
				/*fl = true;
				break;*/
				return Tokens[i];
			}
		}
		//if(!fl)
		//{
		//	cout << "Не распознана цепочка: " << str << endl;
		//}
		return EOF;
	}

	void Scanner(LT::LexTable& lextable, IT::IdTable& idtable, In::IN& in, Parm::PARM& parm, Log::LOG& log,bool flag_tokens)
	{

		std::ofstream outfile("Outfile.txt");
		
		if (flag_tokens)
			cout << "\n01 ";
		else
			outfile << "01 ";

		string word = "",
			previous_word = "",
			CurrentScope = "",
			PreviousScope = "",
			NameOfCurrentFunction = "";

		bool DeclaredNewFunction = false,
			 if_flag= false,
			 else_flag= false,
			 round_flag= false;
		int count_if = 0;
		int count_else = 0;
		int count_round = 0;
		int count_words = 0,
			number = 0,
			CounterOfParameters = 0;

		for (int i = 0,j = 0, line = 1; i < in.counter_rows; i++)
		{
			word = reinterpret_cast<char*>(in.pointer[i]);
			
			IT::IDDATATYPE iddatatype;
			auto FillTables = [&]
			{
				char token = Lex::ArrayOfTokens(word.c_str());
				if (token == EOF)
				{
					Log::WriteLine(log, word.c_str(), "-", "");
					throw ERROR_THROW_L(129, line, count_words);
				}
				int ti_idx = TI_NULLIDX;

				if (token == LEX_IF)
				{
					if_flag = true;
					count_if += 1;
				}
				if (token == LEX_ELSE)
				{
					else_flag = true;
					count_else += 1;
				}
				if (token == LEX_ROUND)
				{
					round_flag = true;
					count_round += 1;
				}
				if (token == LEX_VSHORT || token == LEX_VSHORT_LITERAL)
				{
					iddatatype = IT::IDDATATYPE::VSH;
				}
				else if (token == LEX_STRING || token == LEX_STRING_LITERAL)
				{
					iddatatype = IT::IDDATATYPE::STR;
				}
				else if (token == LEX_BOOLEAN || token == LEX_TRUE || token == LEX_FALSE)
				{
					iddatatype = IT::IDDATATYPE::BOL;
				}

				if (token == LEX_LEFTHESIS)
				{
					CounterOfParameters = 0;
					DeclaredNewFunction = ((lextable.size >= 2 && lextable.table[lextable.size - 2].lexema == LEX_FUNCTION)||
							(lextable.size >= 1 && (lextable.table[lextable.size - 1].lexema == LEX_LENGTH ||
							lextable.table[lextable.size - 1].lexema == LEX_COMPARE || lextable.table[lextable.size - 1].lexema == LEX_CONVERT)));
					if (lextable.size >= 1 && DeclaredNewFunction)
					{
						if (lextable.table[lextable.size - 1].lexema == LEX_LENGTH)
							CounterOfParameters = 1;
						else if (lextable.table[lextable.size - 1].lexema == LEX_CONVERT)
							CounterOfParameters = 1;
						else if (lextable.table[lextable.size - 1].lexema == LEX_COMPARE)
							CounterOfParameters = 2;
					}
					if (DeclaredNewFunction)
					{
						PreviousScope = CurrentScope;
						CurrentScope += NameOfCurrentFunction;
					}
				}
				else if (token == LEX_RIGHTHESIS && DeclaredNewFunction)
				{
					
					CurrentScope = PreviousScope;
					int index = IT::IsId(idtable, CurrentScope.c_str(), NameOfCurrentFunction.c_str());
					idtable.table[index].countOfPar = CounterOfParameters;
					
					DeclaredNewFunction = false;
				}
				else if (token == LEX_LEFTBRACE)
				{
					if (count_if==0 && count_else==0 && count_round==0)	//if (!if_flag && !else_flag && !round_flag)
					{
						PreviousScope = CurrentScope;
						CurrentScope += NameOfCurrentFunction;
					}
					else if (count_if == 0 && count_round==0)
					{
						PreviousScope = CurrentScope;
						CurrentScope += NameOfCurrentFunction;
					}
					/*else if (!round_flag)
					{
						PreviousScope = CurrentScope;
						CurrentScope += NameOfCurrentFunction;
					}*/
					
				}
				else if (token == LEX_BRACELET)
				{
					
					if (count_if == 0 && count_else == 0 && count_round==0)//if (!if_flag && !else_flag && !round_flag)
					{
						CurrentScope = PreviousScope;
						PreviousScope.clear();
						NameOfCurrentFunction.clear();
					}
					if (count_if == 0 && count_round == 0)//if(!if_flag && !round_flag)
					{
						CurrentScope = PreviousScope;
						PreviousScope.clear();
						NameOfCurrentFunction.clear();
					}
					if (if_flag)
					{
						if_flag = false;
						count_if -= 1;
					}
					if (else_flag)
					{
						else_flag = false;
						count_else -= 1;
					}
					if (round_flag)
					{
						round_flag = false;
						count_round -= 1;
					}
				}
				else if (token == LEX_VSHORT_LITERAL)
				{
					if (lextable.table[i - 1].lexema == LEX_DATATYPE && lextable.table[i - 2].lexema == LEX_SET)
					{
						throw ERROR_THROW(127);
					}
					int literal = std::stoi(word.c_str());
					ti_idx = IT::IsLiteral(idtable, literal);
					if (ti_idx == TI_NULLIDX)
					{
						std::string name = "L";
						name += std::to_string(number);
						IT::Add(idtable, { lextable.size, "", name.c_str(), IT::IDTYPE::L, literal});
						++number;
					}
					token = LEX_LITERAL;
				}
				else if (token == LEX_TRUE)
				{
					if (lextable.table[i - 1].lexema == LEX_DATATYPE && lextable.table[i - 2].lexema == LEX_SET)
					{
						throw ERROR_THROW(127);
					}
					bool literal = true;
					ti_idx = IT::IsLiteral(idtable, literal);
					if (ti_idx == TI_NULLIDX)
					{
						std::string name = "L";
						name += std::to_string(number);
						IT::Add(idtable, { lextable.size, "", name.c_str(), IT::IDTYPE::L, literal });
						++number;
					}
					token = LEX_LITERAL;
				}
				else if (token == LEX_FALSE)
				{
				if (lextable.table[i - 1].lexema == LEX_DATATYPE && lextable.table[i - 2].lexema == LEX_SET)
				{
					throw ERROR_THROW(127);
				}
					bool literal = false;
					ti_idx = IT::IsLiteral(idtable, literal);
					if (ti_idx == TI_NULLIDX)
					{
						std::string name = "L";
						name += std::to_string(number);
						IT::Add(idtable, { lextable.size, "", name.c_str(), IT::IDTYPE::L, literal });
						++number;
					}
					token = LEX_LITERAL;

				}
				else if (token == LEX_STRING_LITERAL)
				{
				if (lextable.table[i - 1].lexema == LEX_DATATYPE && lextable.table[i - 2].lexema == LEX_SET)
				{
					throw ERROR_THROW(127);
				}
					std::string literal = word.substr(1, word.size() - 2);
					ti_idx = IT::IsLiteral(idtable, literal.c_str());

					if (ti_idx == TI_NULLIDX)
					{
						std::string name = "L";
						name += std::to_string(number);
						IT::Add(idtable, { lextable.size, "", name.c_str(), IT::IDTYPE::L, literal.c_str() });
						++number;
					}
					token = LEX_LITERAL;
				}
				else if (token == LEX_ID || token == LEX_CONVERT || token == LEX_LENGTH || token == LEX_COMPARE)
				{
					std::string id = word.substr(0, ID_MAXSIZE);
					ti_idx = IT::IsId(idtable, CurrentScope.c_str(), id.c_str());

					if (ti_idx == TI_NULLIDX)
					{
						if (lextable.size >= 2 && lextable.table[lextable.size - 2].lexema == LEX_SET &&
							lextable.table[lextable.size - 1].lexema == LEX_DATATYPE)
						{
							IT::Add(idtable, { lextable.size, CurrentScope.c_str(), id.c_str(), iddatatype,IT::IDTYPE::V });
						}
						else if (token == LEX_CONVERT || token == LEX_LENGTH || token == LEX_COMPARE )
						{
							NameOfCurrentFunction = id;
							iddatatype = (token == LEX_CONVERT || token == LEX_LENGTH) ? IT::IDDATATYPE::VSH : IT::IDDATATYPE::BOL;
							IT::Add(idtable, { lextable.size, CurrentScope.c_str(), id.c_str(), iddatatype, IT::IDTYPE::F });
						}
						else if (lextable.size >= 1 && lextable.table[lextable.size - 1].lexema == LEX_FUNCTION)
						{
							NameOfCurrentFunction = id;
							IT::Add(idtable, { lextable.size, CurrentScope.c_str(), id.c_str(), iddatatype, IT::IDTYPE::F });
						}
						else if (lextable.size >= 1 && lextable.table[lextable.size - 1].lexema == LEX_DATATYPE &&
							DeclaredNewFunction) {
							IT::Add(idtable, { lextable.size, CurrentScope.c_str(), id.c_str(), iddatatype, IT::IDTYPE::P });
							CounterOfParameters++;
						}
						else {
							Log::WriteLine(log, word.c_str(), " - ", "");
							throw ERROR_THROW(126);
						}
					}
					else if (lextable.size >= 2 && lextable.table[lextable.size - 2].lexema == LEX_SET)
					{
						Log::WriteLine(log, word.c_str(), " - ", "");
						throw ERROR_THROW(123);
					}
					else if (lextable.size >= 1 && lextable.table[lextable.size - 1].lexema == LEX_FUNCTION)
					{
						Log::WriteLine(log, word.c_str(), " - ", "");
						throw ERROR_THROW(124);
					}
					/*else if (ti_idx!= TI_NULLIDX &&	DeclaredNewFunction && idtable.table[ti_idx].idtype == IT::IDTYPE::P )
					{
						Log::WriteLine(log, word.c_str(), " - ", "");
						throw ERROR_THROW(125);
					}*/
				}
				else if (token == LEX_PROGRAM && CurrentScope.empty()) 
				{
					ti_idx = IT::IsId(idtable, "", word.c_str());
					if (ti_idx != TI_NULLIDX)
					{
						Log::WriteLine(log, word.c_str(), " -", "");
						throw ERROR_THROW(131);
					}
					CurrentScope.clear();
					NameOfCurrentFunction = word;
					IT::Add(idtable, { lextable.size, "", word.c_str(),	IT::IDTYPE::F, 0 });
				}

				token = (token == LEX_VSHORT || token == LEX_STRING || token == LEX_BOOLEAN) ? LEX_DATATYPE : token;
			
				

				if (token == LEX_ID || token == LEX_LITERAL || token == LEX_PROGRAM)
				{
					char sign = '+';
					if (previous_word[0] == LEX_MINUS && (lextable.table[lextable.size - 2].lexema == LEX_LEFTHESIS
						|| lextable.table[lextable.size - 2].lexema == LEX_EQUALS))
					{
						sign = '-';
					}

					if (ti_idx == TI_NULLIDX)
					{
						LT::Add(lextable, { token, line, idtable.size - 1, sign });
					}
					else
					{
						LT::Add(lextable, { token, line, ti_idx ,sign});
					}
				}
				else if (token == LEX_CONVERT || token == LEX_LENGTH || token == LEX_COMPARE )
				{
					char sign = '+';
					if (previous_word[0] == LEX_MINUS && (lextable.table[lextable.size - 2].lexema == LEX_LEFTHESIS
						|| lextable.table[lextable.size - 2].lexema == LEX_EQUALS))
					{
						 sign = '-';;
					}

					if (ti_idx == TI_NULLIDX)
					{ 
						if (token == LEX_CONVERT || token == LEX_LENGTH)
						{
							LT::Add(lextable, { token, line, idtable.size - 1 ,sign});
						}
						else
						{
							LT::Add(lextable, { token, line, idtable.size - 1 });

						}
					}
					else
					{
						if (token == LEX_CONVERT || token == LEX_LENGTH)
						{
							LT::Add(lextable, { token, line, ti_idx ,sign });
						}
						else
						{
							LT::Add(lextable, { token, line, ti_idx });

						}
					}
				}
				else
				{
					switch (token)
					{
					case '+':
					{
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 4, LT::OPER::PLUS });
						break;
					}
					case '-':
					{
						if (reinterpret_cast<char*>(in.pointer[i - 1])[0] == '=' || reinterpret_cast<char*>(in.pointer[i - 1])[0] == '(')
						{
							LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 4 ,LT::OPER::NOT });
						}
						else
							LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 4 ,LT::OPER::MINUS });
						break;
					}
						
					case '/':
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 5 ,LT::OPER::DIV});
						break;
					case '%':
					{
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 5 ,LT::OPER::PERC });
						break;
					}
					case '*':
					{
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 5, LT::OPER::MUL });
						break;
					}
					case '>':
					{
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 2 ,LT::OPER::MORE });
						break;
					}
					case '<':
					{
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 2 ,LT::OPER::LESS });
						break;
					}
					case '~':
					{
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 3 ,LT::OPER::EQU });
						break;
					}
					case '!':
					{
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 3 ,LT::OPER::NOTEQU });
						break;
					}
					case ':':
					{
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 2 ,LT::OPER::MOREOREQU });
						break;
					}
					case '^':
					{
						LT::Add(lextable, { LEX_OPERATOR , line, LT_TI_NULLIDX, 2 , LT::OPER::LESSOREQU });
						break;
					}
					case '(':
					{
						LT::Add(lextable, { token , line, LT_TI_NULLIDX, 1 });
						break;
					}
					case ')':
					{
						LT::Add(lextable, { token , line, LT_TI_NULLIDX, 1 });
						break;
					}
					default:
					{
						LT::Add(lextable, { token , line, LT_TI_NULLIDX });
						break;
					}

					}
				}
				previous_word = word;

				if (flag_tokens)
					cout << token;
				else
					outfile << token;
				word.clear();
				
			};
			if (word == "")
				continue;
			FillTables();
			count_words++;
			if (count_words == in.CounterWordsinLine[j] && in.CounterWordsinLine[j + 1] != -1) {
				j++;
				line++;
				
				if(flag_tokens)
					cout << "\n" << std::setw(2) << std::setfill('0') << line << " ";
				else
					outfile << "\n" << std::setw(2) << std::setfill('0') << line << " ";

				count_words = 0;
				while (true)
				{
					if (in.CounterWordsinLine[j] == 0)
					{
						j++;
						line++;
					}
					else
						break;
				}
			}
			
		}
		if (flag_tokens)
			cout << "\n\n";
	}

}