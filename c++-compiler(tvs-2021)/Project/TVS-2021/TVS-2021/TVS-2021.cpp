#include "Addictions.h"
#include "Libs.h"

int _tmain(int argc, _TCHAR* argv[])
{
	setlocale(LC_ALL, "RU");
	Log::LOG log = Log::INITLOG;
	try
	{
		Parm::PARM parm = Parm::getparm(argc, argv);
		log = Log::getlog(parm.log);
		Log::WriteLog(log);
		Log::WriteParm(log, parm);
		In::IN in = In::getin(parm.in);
		cout << "1.Разбор с файла выполнен" << endl;
		Log::WriteIn(log, in);
		LT::LexTable lextable = LT::Create(in.size);
		IT::IdTable idtable = IT::Create(in.size);
		Lex::Scanner(lextable, idtable, in, parm, log, parm.tokens);
		cout << "2.Лексический анализ выполнен" << endl;
		MFST::Mfst mfst(lextable, GRB::getGreibach(), parm.rules/*"MFST.txt"*/);
		if (mfst.start(*log.stream))
		{
			cout << "3.Cинтаксичекий анализ выполнен успешно" << endl;
		}
		else
		{
			cout << "3.Синтакcический анализ: ERROR!" << endl;
			//exit(0);
		}
		mfst.printrules();
		SA::SemAnalysis(lextable, idtable,log);
		PN::Polish(lextable, idtable);
		cout << "4.Семантический анализ выполнен" << endl;
		cout << "5.Перевод в обратную польскую запись выполнен" << endl;
		PN::SynchronizeTables(lextable, idtable);	
		cout << "6.Синхронизация таблиц выполнена" << endl;
		
		if (parm.idtable)
			IT::WriteTable(idtable);
		else
			ShowIdTable(idtable);
		if (parm.lextable)
			LT::WriteLexTable(lextable);
		else
			ShowLexTable(lextable);

		Generator::Gener Gener(lextable, idtable, L"../Assembler/Assm.asm");// ../Debug/Assm.asm ../Assembler/Assm.asm 
		*log.stream << "\n  ==============############             Код успешно сгенерирован          ############==============\n";
		cout << "7.Генерация кода выполнена успешно" << endl;
		LT::Delete(lextable);
		IT::Delete(idtable);
		Log::Close(log);

		//system("ml.exe /DYNAMICBASE \"kernel32.lib\" \"user32.lib\" \"gdi32.lib\" \"winspool.lib\" \"comdlg32.lib\" \"advapi32.lib\" \"shell32.lib\" \"ole32.lib\" \"oleaut32.lib\" \"uuid.lib\" \"odbc32.lib\" \"odbccp32.lib\" \"../Debug/TVS-2021_Lib.lib\" \"Assm.asm\"  -link /subsystem:console");//../Debug/  \"../Assembler/Assm.asm\"
		
		//string str = "";								//тестирование разбора цепочек
		//for (int i = 0; i < in.counter_rows; i++)
		//{
		//	str = reinterpret_cast<char*>(in.pointer[i]);
		//	Lex::ArrayOfTokens(str.c_str());
		//}
	}
	catch (Error::ERROR e)
	{
		Log::WriteError(log, e);
	}
}

