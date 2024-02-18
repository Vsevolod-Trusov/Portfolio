#include "PolishNotation.h"
#include <stack>
#include "LT.h"
#include "IT.h"
#include "Errors.h"
#include <iostream>

namespace PN
{
	int GetExpr(LT::LexTable lextable, int i)
	{
		for (; lextable.table[i].lexema != LEX_SEMICOLON; i++);//Находим конец выражения 
		return i;
	}

	int Priorities(char operation)
	{
		if (operation == LEX_LEFTHESIS || operation == LEX_RIGHTHESIS)
			return 1;
		if (operation == LEX_MORE || operation == LEX_LESS || operation == LEX_MOREOREQUALS || operation == LEX_LESSOREQUALS)
			return 2;
		if (operation == LEX_TILDE || operation == LEX_EXMARK)
			return 3;
		if (operation == LEX_MINUS || operation == LEX_PLUS)
			return 4;
		if (operation == LEX_DIRSLASH || operation == LEX_STAR || operation == LEX_PERCENT)
			return 5;
	}
	
	void AddExpr(LT::LexTable& lextable, IT::IdTable& idtable, LT::Entry* expression, int StartPosition, int SizeOfExpression)
	{
		for (int i = StartPosition, j=0; j < SizeOfExpression; i++, j++)
		{
			lextable.table[i] = expression[j];
		}
	}

	int ConvertExpr(LT::Entry* expr, LT::LexTable lextable, IT::IdTable idtable, int position, int endOfexpression)
	{
		std::stack<LT::Entry> stack;
		int SizeOfExpression = 0;
		int CounterOfLeftBracket = 0;
		bool un_minus = false;
		int counter_un_min = 0;
		int seve_position = position;
		for (;  position < endOfexpression; position++)
		{
			if ((lextable.table[position].lexema == LEX_ID || lextable.table[position].lexema == LEX_LITERAL) &&										/*проверка на то что лексема именно переменная или литерал*/
				idtable.table[lextable.table[position].idxTI].idtype != IT::IDTYPE::F && lextable.table[position].lexema != LEX_CONVERT &&
				lextable.table[position].lexema != LEX_LENGTH && lextable.table[position].lexema != LEX_COMPARE)
			{
				expr[SizeOfExpression++] = lextable.table[position];
			}
			else if (idtable.table[lextable.table[position].idxTI].idtype == IT::IDTYPE::F || lextable.table[position].lexema == LEX_CONVERT ||
				lextable.table[position].lexema == LEX_LENGTH || lextable.table[position].lexema == LEX_COMPARE)
			{
				LT::Entry ReplacingFunction = lextable.table[position];
				ReplacingFunction.lexema = LEX_COMMERCIALAT;
				if (lextable.table[position].lexema == LEX_CONVERT)
				{
					ReplacingFunction.idxTI = IT::IsId(idtable, idtable.table[ReplacingFunction.idxTI].scope, "Convert");
				}
				else if (lextable.table[position].lexema == LEX_LENGTH)
				{
					ReplacingFunction.idxTI = IT::IsId(idtable, idtable.table[ReplacingFunction.idxTI].scope, "StrLength");
				}
				else if (lextable.table[position].lexema == LEX_COMPARE)
				{
					ReplacingFunction.idxTI = IT::IsId(idtable, idtable.table[ReplacingFunction.idxTI].scope, "Compare");
				}
				position++;
				int CounterOfParameters = 0;
				while (lextable.table[position].lexema !=LEX_RIGHTHESIS)
				{
					if (lextable.table[position].lexema == LEX_ID || lextable.table[position].lexema == LEX_LITERAL)
					{
						expr[SizeOfExpression++] = lextable.table[position];
						CounterOfParameters++;
					}
					position++;
				}
				expr[SizeOfExpression++] = ReplacingFunction;
				expr[SizeOfExpression].lexema = CounterOfParameters;
				expr[SizeOfExpression++].idxTI = LT_TI_NULLIDX;														//++ потому что со следующей итерации 
			}																										//будет записываться новая переменная
			else if (lextable.table[position].lexema == LEX_LEFTHESIS)												//литерал или оператор и нам нужна пустая  
			{																										//ячейка а если не декриментировать то запишется в эту же
				CounterOfLeftBracket++;																				 
				stack.push(lextable.table[position]);																// кладем в стек левую скобку
			}
			else if (lextable.table[position].lexema == LEX_RIGHTHESIS)
			{
				while (stack.size())
				{
					if (stack.top().lexema == LEX_LEFTHESIS)break;
					expr[SizeOfExpression++] = stack.top();
					stack.pop();
				}
				stack.pop();
				CounterOfLeftBracket--;
			}
			
			else if (stack.size() == 0 || stack.top().lexema == LEX_LEFTHESIS)										//проверяем стек пустой или на вершине левая скобка ( чтобы записать в стек оператор
			{
				if (lextable.table[position - 1].lexema == LEX_LEFTHESIS || lextable.table[position - 1].lexema == LEX_EQUALS)
				{
					un_minus = true;
					counter_un_min++;
					if (idtable.table[lextable.table[position + 1].idxTI].iddatatype != IT::IDDATATYPE::VSH)
						throw ERROR_THROW_SEM(689, lextable.table[position + 1].sn);
				}
				stack.push(lextable.table[position]);
			}
			else
			{
				if ((lextable.table[position].operation == LT::OPER::NOT)
				&& (lextable.table[position - 1].lexema == LEX_LEFTHESIS || lextable.table[position - 1].lexema == LEX_EQUALS))
				{
					un_minus = true;
					counter_un_min++;
					if (idtable.table[lextable.table[position + 1].idxTI].iddatatype != IT::IDDATATYPE::VSH)
						throw ERROR_THROW_SEM(689, lextable.table[position + 1].sn);
				}
				while (stack.size())														//if (Priorities(lextable.table[position].lexema) > Priorities(stack.top().lexema))break;	
				{
					if (lextable.table[position].priority > stack.top().priority)break;			//если приоритет выше это означает что оператор выйдет из стека раньше 
					expr[SizeOfExpression++] = stack.top();																			//чем оператор у которого приоритет ниже значит оператор с большим приоритетом
					stack.pop();																									// в стек ложиться позже чем оператор с меньшим приоритетом
				}
				stack.push(lextable.table[position]);
			}
		}
		while (stack.size())
		{
			expr[SizeOfExpression++] = stack.top();
			stack.pop();
		}
		/*for (int i = 0; i < SizeOfExpression; i++)
		{
			if (i >= 1)
			{
				if (expr[i - 1].lexema == LEX_COMMERCIALAT)
					std::cout << (int)expr[i].lexema;
				else
					std::cout << expr[i].lexema;
			}
			else
				std::cout << expr[i].lexema;
		}
		std::cout << '\n';*/
		LT::Entry temp_element;
		IT::IDDATATYPE operand1;
		IT::IDDATATYPE operand2;
		std::stack<IT::IDDATATYPE> datatype_stack;
		for (int i = 0; i < SizeOfExpression; i++)
		{
			/*if (expr[i].lexema == LEX_MORE || expr[i].lexema == LEX_LESS || expr[i].lexema == LEX_MOREOREQUALS ||
				expr[i].lexema == LEX_LESSOREQUALS || expr[i].lexema == LEX_TILDE || expr[i].lexema == LEX_EXMARK ||
				expr[i].lexema == LEX_PLUS || expr[i].lexema == LEX_MINUS || expr[i].lexema == LEX_STAR ||
				expr[i].lexema == LEX_DIRSLASH || expr[i].lexema == LEX_PERCENT)*/
			if(expr[i].lexema == LEX_OPERATOR)
			{
				 if (expr[i].operation == LT::OPER::NOT && un_minus && counter_un_min !=0 )	//будет записываться новая переменная 
				{
					 --counter_un_min;
					 operand1 = datatype_stack.top();
					 datatype_stack.pop();
					if (operand1 != IT::IDDATATYPE::VSH)
						throw ERROR_THROW_SEM(689, lextable.table[position + 1].sn);
					else
						datatype_stack.push(IT::IDDATATYPE::VSH);
				}
				 else
				 {
					 temp_element = stack.top();
					 stack.pop();

					 operand1 = datatype_stack.top();
					 datatype_stack.pop();
					 operand2 = datatype_stack.top();
					 datatype_stack.pop();
					 if (operand1 != operand2)
					 {
						 throw ERROR_THROW_SEM(689, temp_element.sn);
					 }
					 else if ((operand1 == operand2) && (expr[i].operation == LT::OPER::MORE || expr[i].operation == LT::OPER::LESS || expr[i].operation == LT::OPER::MOREOREQU ||
						 expr[i].operation == LT::OPER::LESSOREQU || expr[i].operation == LT::OPER::EQU || expr[i].operation == LT::OPER::NOTEQU) &&
						 operand1 == IT::IDDATATYPE::STR)
					 {
						 throw ERROR_THROW_SEM(689, temp_element.sn);
					 }
					 else if ((operand1 == operand2) && (expr[i].operation == LT::OPER::PLUS || expr[i].operation == LT::OPER::MINUS || expr[i].operation == LT::OPER::MUL ||
						 expr[i].operation == LT::OPER::DIV || expr[i].operation == LT::OPER::PERC) && (operand1 == IT::IDDATATYPE::BOL
							 || operand1 == IT::IDDATATYPE::STR))
					 {
						 throw ERROR_THROW_SEM(689, temp_element.sn);
					 }
					 else if ((expr[i].operation == LT::OPER::MORE || expr[i].operation == LT::OPER::LESS || expr[i].operation == LT::OPER::MOREOREQU ||
						 expr[i].operation == LT::OPER::LESSOREQU || expr[i].operation == LT::OPER::EQU || expr[i].operation == LT::OPER::NOTEQU) &&
						 operand1 != IT::IDDATATYPE::STR)
					 {
						 datatype_stack.push(IT::IDDATATYPE::BOL);
					 }
					 else if ((expr[i].operation == LT::OPER::PLUS || expr[i].operation == LT::OPER::MINUS || expr[i].operation == LT::OPER::MUL ||
						 expr[i].operation == LT::OPER::DIV || expr[i].operation == LT::OPER::PERC) && operand1 != IT::IDDATATYPE::BOL
						 && operand1 != IT::IDDATATYPE::STR)
					 {
						 datatype_stack.push(IT::IDDATATYPE::VSH);
					 }

				 }
			}
			else 
			{
				if (i >= 1)
				{
					if (expr[i - 1].lexema == LEX_COMMERCIALAT)
					{
						for (int j = 0; j < int(expr[i].lexema) + 1; j++)
						{
							datatype_stack.pop();
							stack.pop();
						}
						datatype_stack.push(idtable.table[expr[i - 1].idxTI].iddatatype);
						stack.push(expr[i - 1]);
					}
					else
					{
						datatype_stack.push(idtable.table[expr[i].idxTI].iddatatype);
						stack.push(expr[i]);
					}
				}
				else
				{
					datatype_stack.push(idtable.table[expr[i].idxTI].iddatatype);
					stack.push(expr[i]);
				}
			}
		}
		if (lextable.table[seve_position - 1].lexema == LEX_EQUALS)
		{
			if (idtable.table[lextable.table[seve_position - 2].idxTI].iddatatype != datatype_stack.top())
			{
				throw ERROR_THROW(691);
			}
		}
		while (stack.size())stack.pop();//очищаем stack
		while (datatype_stack.size())datatype_stack.pop();//очищаем datatype_stack
		
		return SizeOfExpression;
	}

	void PullUpLexTable(LT::LexTable& lextable, IT::IdTable& idtable, int StartPosition, int SizeOfExpression, int EndOfExpression)
	{
		for (int difference = EndOfExpression - (StartPosition + SizeOfExpression),  i = 0; i < difference; i++)
		{
			for (int position = StartPosition + SizeOfExpression; position < lextable.size; position++)
			{
				lextable.table[position] = lextable.table[position + 1];
			}
			lextable.size--;
		}
	}
	void SynchronizeTables(LT::LexTable& lextable, IT::IdTable& idtable)
	{
		bool* is_changed = new bool[idtable.size]{ false };
		int index = 0;
		for (int i = 0; i < lextable.size; i++)
		{
			if ((lextable.table[i].lexema == LEX_ID || lextable.table[i].lexema == LEX_LITERAL 
				|| lextable.table[i].lexema == LEX_RETRIEVE || lextable.table[i].lexema == LEX_COMMERCIALAT || lextable.table[i].lexema == LEX_PROGRAM ||
				 lextable.table[i].lexema == LEX_OUTPUT || lextable.table[i].lexema == LEX_COMPARE || lextable.table[i].lexema == LEX_CONVERT ||
				 lextable.table[i].lexema == LEX_LENGTH)
				&& !is_changed[lextable.table[i].idxTI] && lextable.table[i].idxTI != -1)
			{
				idtable.table[lextable.table[i].idxTI].idxfirstLE = i;
				is_changed[lextable.table[i].idxTI] = true;
			}
		}
	}

	void Polish(LT::LexTable& lextable, IT::IdTable& idtable)
	{
		LT::Entry expression[SIZE_OF_EXPRESSION];
		int StartPosition = 0;
		for (int i = 0; i < lextable.size; i++)
		{
			if (lextable.table[i].lexema == LEX_EQUALS || lextable.table[i].lexema == LEX_RETRIEVE || lextable.table[i].lexema == LEX_OUTPUTS || lextable.table[i].lexema == LEX_OUTPUT )
			{
				StartPosition = i + 1;
				int EndPosition = GetExpr(lextable, StartPosition);
				int SizeOfExpression = ConvertExpr(expression, lextable, idtable, StartPosition, EndPosition);
				AddExpr(lextable, idtable, expression, StartPosition, SizeOfExpression);
				PullUpLexTable(lextable, idtable, StartPosition, SizeOfExpression, EndPosition);
			}
		}
		
	}
}