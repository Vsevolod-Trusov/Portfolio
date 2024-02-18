#include"SemAnalysis.h"
#include"Errors.h"
#include "Log.h"
#include "LexAnalysis.h"
namespace SA
{
	void SemAnalysis(LT::LexTable& lextable, IT::IdTable& idtable, const Log::LOG& log)
	{
		CheckRetrieveValueOfFunction( lextable,idtable);
		CheckСountOfParameter(lextable, idtable);
		CheckOfParameterTypes(lextable, idtable);
		//Types(lextable, idtable);
		СheckСondition(lextable, idtable);
		*log.stream<< " \n ==============############    Семантический анализ выполнен без ошибок   ############==============\n";
	}
	void СheckСondition(LT::LexTable& lextable, IT::IdTable& idtable) {
		int counter_of_parameters = 0;
		int save_pos = 0;
		for (int i = 0; i < lextable.size; i++)
		{
			if (lextable.table[i].lexema == LEX_IF)
			{
				save_pos = i;
				while (lextable.table[i].lexema != LEX_RIGHTHESIS)
				{
					if (idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::L ||
						idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::V ||
						idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::P||
						idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::F)
						counter_of_parameters++;
					i++;
				}
				i = save_pos;
				if (counter_of_parameters == 1)
				{
					if((idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::L || idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::V ||
						idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::P)&&
						idtable.table[lextable.table[i + 2].idxTI].iddatatype != IT::IDDATATYPE::BOL
						)
					{
						throw ERROR_THROW_SEM(680, lextable.table[i].sn);
					}
					else if (idtable.table[lextable.table[i + 2].idxTI].idtype == IT::IDTYPE::F &&
						idtable.table[lextable.table[i + 2].idxTI].iddatatype != IT::IDDATATYPE::BOL) {
						throw ERROR_THROW_SEM(680, lextable.table[i].sn);
					}
						
				}
				else if (counter_of_parameters == 2)
				{
					 if ((idtable.table[lextable.table[i + 2].idxTI].iddatatype != idtable.table[lextable.table[i + 4].idxTI].iddatatype) &&
						(lextable.table[i + 1].lexema == LEX_LEFTHESIS && lextable.table[i + 3].lexema != LEX_RIGHTHESIS))
					{
						throw ERROR_THROW_SEM(680, lextable.table[i].sn);
					}
				}
				
			}
			if (lextable.table[i].lexema == LEX_ROUND)
			{
				if ((idtable.table[lextable.table[i + 2].idxTI].iddatatype == idtable.table[lextable.table[i + 4].idxTI].iddatatype) &&
					idtable.table[lextable.table[i + 2].idxTI].iddatatype == IT::IDDATATYPE::BOL &&
					(lextable.table[i + 1].lexema == LEX_LEFTHESIS /*&& lextable.table[i + 3].lexema != LEX_RIGHTHESIS*/))
				{
					throw ERROR_THROW_SEM(690, lextable.table[i].sn);
				}
				else if (lextable.table[i + 1].lexema == LEX_LEFTHESIS && lextable.table[i + 3].lexema == LEX_RIGHTHESIS &&
					idtable.table[lextable.table[i + 2].idxTI].iddatatype != IT::IDDATATYPE::BOL)
				{
					throw ERROR_THROW_SEM(690, lextable.table[i].sn);
				}
			}
		}
	}
	void Types(LT::LexTable& lextable, IT::IdTable& idtable)
	{
		for (int i = 0; i < lextable.size; i++)
		{
			if (lextable.table[i].lexema == LEX_EQUALS && lextable.table[i+1].lexema != LEX_LEFTHESIS)
			{
				if ((lextable.table[i+1].lexema == LEX_ID || lextable.table[i + 1].lexema == LEX_LITERAL) && lextable.table[i + 2].lexema == LEX_SEMICOLON)
				{
 					if(idtable.table[lextable.table[i - 1].idxTI].iddatatype != idtable.table[lextable.table[i + 1].idxTI].iddatatype)/*если нет ни логических операций ни арифметические*/
					{
						if (idtable.table[lextable.table[i - 1].idxTI].idtype == IT::IDTYPE::V &&	/*если слева стоит переменная а справа литерал*/
							idtable.table[lextable.table[i + 1].idxTI].idtype == IT::IDTYPE::L) {
							throw ERROR_THROW_SEM(681, lextable.table[i].sn);
						}
						else if (idtable.table[lextable.table[i - 1].idxTI].idtype == IT::IDTYPE::V && /*если слева стоит переменная а справа функция*/
							idtable.table[lextable.table[i + 1].idxTI].idtype == IT::IDTYPE::F) {
							throw ERROR_THROW_SEM(682, lextable.table[i].sn);

						}
					}
				}

				
				if ((lextable.table[i + 1].lexema == LEX_ID || lextable.table[i + 1].lexema == LEX_LITERAL) && lextable.table[i + 2].lexema == LEX_LEFTHESIS)
				{
					if (idtable.table[lextable.table[i - 1].idxTI].iddatatype != idtable.table[lextable.table[i + 1].idxTI].iddatatype)/*если нет ни логических операций ни арифметические*/
					{
						if (idtable.table[lextable.table[i - 1].idxTI].idtype == IT::IDTYPE::V &&	/*если слева стоит переменная а справа литерал*/
							idtable.table[lextable.table[i + 1].idxTI].idtype == IT::IDTYPE::L) {
							throw ERROR_THROW_SEM(681, lextable.table[i].sn);
						}
						else if (idtable.table[lextable.table[i - 1].idxTI].idtype == IT::IDTYPE::V && /*если слева стоит переменная а справа функция*/
							idtable.table[lextable.table[i + 1].idxTI].idtype == IT::IDTYPE::F) {
							throw ERROR_THROW_SEM(682, lextable.table[i].sn);

						}
					}
				}
			
			}
		}
	}
	void CheckRetrieveValueOfFunction(LT::LexTable& lextable, IT::IdTable& idtable)
	{
		for (int i = 0; i < lextable.size; i++)
		{
			if (lextable.table[i].lexema == LEX_FUNCTION)
			{
				int j = i;
				while (lextable.table[j].lexema != LEX_RETRIEVE)
					j++;
				if(idtable.table[lextable.table[i+1].idxTI].iddatatype!= idtable.table[lextable.table[j+1].idxTI].iddatatype)
					throw ERROR_THROW_SEM(683, lextable.table[i].sn);
				
			}
		}
	}

	void CheckOfParameterTypes(LT::LexTable& lextable, IT::IdTable& idtable)
	{
		for (int i = 0; i < lextable.size; i++)
		{
			if (lextable.table[i].lexema == LEX_ID && lextable.table[i - 1].lexema != LEX_FUNCTION && idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::F)
			{
				int save_position = i;
				int step = 1;
				while (lextable.table[i++].lexema != LEX_RIGHTHESIS)
				{
					if (lextable.table[i].lexema == LEX_ID || lextable.table[i].lexema == LEX_LITERAL)
					{
						if (idtable.table[lextable.table[i].idxTI].iddatatype != idtable.table[lextable.table[save_position].idxTI + step].iddatatype)
							throw ERROR_THROW_SEM(685, lextable.table[i].sn);
						step++;
					}
				}
			}
		}
	}
	void CheckСountOfParameter(LT::LexTable& lextable, IT::IdTable& idtable)
	{
		for (int i = 0; i < lextable.size; i++)
		{
			if (lextable.table[i].lexema == LEX_ID && lextable.table[i-1].lexema!=LEX_FUNCTION && idtable.table[lextable.table[i].idxTI].idtype == IT::IDTYPE::F)
			{
				int save_position = i;
				int counterOfParameters = 0;
				while (lextable.table[i++].lexema != LEX_RIGHTHESIS)
				{
					if(lextable.table[i].lexema == LEX_ID || lextable.table[i].lexema == LEX_LITERAL)
						counterOfParameters++;
				}
				if (idtable.table[lextable.table[save_position].idxTI].countOfPar != counterOfParameters)
					throw ERROR_THROW_SEM(684, lextable.table[i].sn);
			}
		}
	}
}