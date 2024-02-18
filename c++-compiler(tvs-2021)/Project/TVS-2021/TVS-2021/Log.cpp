#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
#include "Log.h"
#include"Alphabet.h"
#include"Errors.h"
#include"Parm.h"

#define BUFFER_MAX_SIZE 200
namespace Log {
    LOG getlog(wchar_t logfile[])
    {
        LOG log;
        ofstream stream;
        stream.open(logfile);
        if (!stream.is_open())
            throw ERROR_THROW(112)
        else
        {
            wcscpy_s(log.logfile, logfile);
            log.stream = new ofstream;                  // log.stream = &stream
            log.stream->open(logfile);
            return log;
        }
    }
    
    void WriteLine(LOG log, const char* c, ...)
    {
          const char** p = &c;
          *log.stream << "\n";
         while (*p != "")
         {
             *log.stream << *p;
             *p++;
         }
         *log.stream << "\n";
    }

    void WriteLine(LOG log, const wchar_t* c, ...)
    {
        const wchar_t** p = &c;
        char tmp[200];
        *log.stream << "\n";
        while (*p != L"")
        {
            wcstombs(tmp, *p, sizeof(tmp));
            *log.stream << tmp;
            *p++;
        }
        *log.stream << "\n";
    }

    void WriteLog(LOG log)
    {
        char buf[255];
        time_t t;
        struct tm timeinfo;
        time(&t);
        localtime_s(&timeinfo, &t);
        strftime(buf, sizeof(buf), "Дата: %d.%m.%Y %H:%M:%S ------------", &timeinfo);
        *log.stream << "---- Протокол ----------- ";
        *log.stream << buf << "\n";
    }

    void WriteParm(LOG log, Parm::PARM parm)
    {
        char log_f[PARM_MAX_SIZE];
        char out_f[PARM_MAX_SIZE];
        char in_f[PARM_MAX_SIZE];
        *log.stream << "---- Параметры -----------" << endl;

        wcstombs(log_f, PARM_LOG, sizeof(log_f));
        *log.stream << log_f << " ";
        wcstombs(log_f, parm.log, sizeof(log_f));
        *log.stream << log_f << endl;

        wcstombs(out_f, PARM_OUT, sizeof(out_f));
        *log.stream << out_f << " ";
        wcstombs(out_f, parm.out, sizeof(out_f));
        *log.stream << out_f << endl;

        wcstombs(in_f, PARM_IN, sizeof(in_f));
        *log.stream << in_f << " ";
        wcstombs(in_f, parm.in, sizeof(in_f));
        *log.stream << in_f << endl;

        *log.stream << "Дополнительно: " << (parm.idtable ? "-id  " : "") << (parm.lextable ? "-lex  " : "")
            << (parm.tokens ? "-tokens  " : "") << (parm.rules ? "-rules " : "") << std::endl;
    }

    void WriteIn(LOG log, In::IN in)
    {
        *log.stream << "---- Исходные данные ----" << "\n";
        int lines = 0;
        int col = 0;
        char* str = new char[in.size];
        * log.stream << in.text;
        *log.stream << "\n";
        * log.stream << "Количество символов: " << in.size << "\n";
        *log.stream << "Проигнорировано    : " << in.ignor << "\n";
        *log.stream << "Количество строк   : " << in.lines;
    }

    void WriteError(LOG log, Error::ERROR error)
    {
        std::cout << "Смотри log.txt" << endl;
        if (log.stream)
        {
            *log.stream << "\nОшибка ";
            *log.stream << error.id << ": ";
            *log.stream << error.message;
            if (error.inext.line + error.inext.col > 0)
            {
                *log.stream << " строка " << error.inext.line << " , ";
                *log.stream << " позиция " << error.inext.col << endl;
            }
            else if (error.inext.line > 0)
                *log.stream << " строка " << error.inext.line << endl;
            else
                *log.stream << endl;
            Close(log);
        }
        else
        {
            cout << "Ошибка ";
            cout << error.id << ": ";
            if (error.inext.line + error.inext.col > 0)
            {
                cout << " строка " << error.inext.line << " , ";
                cout << " позиция " << error.inext.col << endl;
            }
            else if (error.inext.line > 0)
               cout << "строка " << error.inext.line << endl;
            else
                *log.stream << endl;
        }
    }

    void Close(LOG log)
    {
        log.stream->close();
        delete log.stream;
    }


}

