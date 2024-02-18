#pragma once
#define IN_MAX_LEN_TEXT  1024*1024			// максимальный размер исходного кода = 1МВ
#define IN_CODE_ENDL '\n'					// символ конц строки
#define IN_CODE_SEP '|'

// таблица проверки входной информации, индекс = код (Windows-1251) символа
// значения IN::F - запрещенный символ, IN::T - разрешенный символ, IN::I - игнорировать (не вводить) 
//			если	0 <= значение < 256 - то вводится данное значение

#define	IN_CODE_TABLE { \
	/*00*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::I, '|',   IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*10*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*20*/IN::S, IN::S, IN::K, IN::T, IN::T, IN::S, IN::F, IN::T, IN::S, IN::S, IN::S, IN::S, IN::S, IN::S, IN::T, IN::S, \
	/*30*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::S, IN::S, IN::S, IN::S, IN::S, IN::F, \
	/*40*/IN::F, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*50*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::S, IN::F, IN::S, IN::S, IN::T, \
	/*60*/IN::F, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*70*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::S, IN::F, IN::S, IN::S, IN::F, \
																								                          \
	/*80*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*90*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*A0*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::T, IN::F, IN::T, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*B0*/IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::F, IN::T, IN::F, IN::T, IN::F, IN::F, IN::F, IN::F, IN::F, \
	/*C0*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*D0*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*E0*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, \
	/*F0*/IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T, IN::T  \
}

namespace In
{
	struct IN		// исходные данные
	{
		// T - допустимый символ, F - недопустимый, I - игнорировать, S - специальный символ, K - ' иначе - заменить
		enum { T = 1024, F = 2048, I = 4096, S = 8192, K = 16384 };
		int size;								// размер исходного кода
		int lines;								// количество строк
		int ignor;								// кол-во проигнорированных символов
		unsigned char* text;					// исходный код (Windows-1251)
		int code[256];							// таблица проверки: T, F, I - новое значение

		unsigned char** pointer;
		int counter_rows;
		int* CounterWordsinLine;
	};
	IN getin(wchar_t infile[]);					// ввести и проверить входной поток
	void output(unsigned char** words, int size);
};



