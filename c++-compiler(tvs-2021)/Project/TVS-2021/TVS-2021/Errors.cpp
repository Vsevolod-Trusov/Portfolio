#include "Errors.h"
#include"Addictions.h"
using namespace std;
namespace Error
{
	/* серия ошибок:	0 - 99 - системные ошибки
						100 - 109 - ошибки параметров
						110 - 119 - ошибки открытия и чтения файлов*/
	ERROR errors[ERROR_MAX_ENTRY] = // таблица ошибок
	{
		ERROR_ENTRY(0, "Недопустимый код ошибки"),		// код ошибки вне диапазона 0 - ERROR_MAX_ENTRY
		ERROR_ENTRY(1, "Системный сбой"),
		ERROR_ENTRY_NODEF(2), ERROR_ENTRY_NODEF(3), ERROR_ENTRY_NODEF(4), ERROR_ENTRY_NODEF(5),
		ERROR_ENTRY_NODEF(6), ERROR_ENTRY_NODEF(7), ERROR_ENTRY_NODEF(8), ERROR_ENTRY_NODEF(9),
		ERROR_ENTRY_NODEF10(10), ERROR_ENTRY_NODEF10(20), ERROR_ENTRY_NODEF10(30),ERROR_ENTRY_NODEF10(40), ERROR_ENTRY_NODEF10(50),
		ERROR_ENTRY_NODEF10(60), ERROR_ENTRY_NODEF10(70), ERROR_ENTRY_NODEF10(80),ERROR_ENTRY_NODEF10(90),
		ERROR_ENTRY(100, "Параметр -in должен быть задан"),
		ERROR_ENTRY_NODEF(101), ERROR_ENTRY_NODEF(102), ERROR_ENTRY_NODEF(103),
		ERROR_ENTRY(104, "Превышена длина входного параметра"),
		ERROR_ENTRY_NODEF(105), ERROR_ENTRY_NODEF(106), ERROR_ENTRY_NODEF(107),
		ERROR_ENTRY_NODEF(108), ERROR_ENTRY_NODEF(109),
		ERROR_ENTRY(110, "Ошибка при открытии файла с исходным кодом (-in)"),
		ERROR_ENTRY(111, "Недопустимый символ в исходном файле (-in)"),
		ERROR_ENTRY(112, "Ошибка при создании протокола(-log)"),
		ERROR_ENTRY(113,  "Ошибка при создании выходого файла Out.txt"),//новое!
		ERROR_ENTRY_NODEF(114), ERROR_ENTRY_NODEF(115),
		ERROR_ENTRY_NODEF(116), ERROR_ENTRY_NODEF(117), ERROR_ENTRY_NODEF(118), ERROR_ENTRY_NODEF(119),
		ERROR_ENTRY(120, "[LEXICAL]Превышено максимальное количество строк в таблице лексем"),
		ERROR_ENTRY(121, "[LEXICAL]Превышена максимальная емкость таблицы лексем"),
		ERROR_ENTRY(122, "[LEXICAL]Выход за пределы таблицы лексем"),
		ERROR_ENTRY(123, "[LEXICAL]Множественное объявление переменной"),
		ERROR_ENTRY(124, "[LEXICAL]Множественное объявление функции"),
		ERROR_ENTRY(125, "[LEXICAL]Повторение имени параметра"),
		ERROR_ENTRY(126,"[LEXICAL]Идентификатор не объявлен"),
		ERROR_ENTRY(127, "[LEXICAL] Использование литерала в объявлении"),
		ERROR_ENTRY_NODEF(128),
		ERROR_ENTRY(129, "[LEXICAL]Неопознанная лексема"),
		ERROR_ENTRY(130, "[LEXICAL]Отсутствует точка входа"),
		ERROR_ENTRY(131, "[LEXICAL]Несколько точек входа"),
		ERROR_ENTRY_NODEF(132),
		ERROR_ENTRY_NODEF(133),
		ERROR_ENTRY_NODEF(134),
		ERROR_ENTRY_NODEF(135),
		ERROR_ENTRY_NODEF(136),
		ERROR_ENTRY_NODEF(137),
		ERROR_ENTRY_NODEF(138),
		ERROR_ENTRY_NODEF(139),
		ERROR_ENTRY_NODEF10(140),
		ERROR_ENTRY_NODEF10(150),
		ERROR_ENTRY(160, "Превышено максимальное количество строк в таблице идентификаторов"),
		ERROR_ENTRY(161, "Превышена максимальная емкость таблицы идентификаторов"),
		ERROR_ENTRY(162, "Выход за пределы таблицы идентификаторов"),
		ERROR_ENTRY_NODEF(163),
		ERROR_ENTRY_NODEF(164),
		ERROR_ENTRY_NODEF(165),
		ERROR_ENTRY_NODEF(166),
		ERROR_ENTRY_NODEF(167),
		ERROR_ENTRY_NODEF(168),
		ERROR_ENTRY_NODEF(169),
		ERROR_ENTRY_NODEF10(170), ERROR_ENTRY_NODEF10(180),ERROR_ENTRY_NODEF10(190),
		ERROR_ENTRY_NODEF100(200), ERROR_ENTRY_NODEF100(300), ERROR_ENTRY_NODEF100(400),ERROR_ENTRY_NODEF100(500),
		ERROR_ENTRY(600, "[SYNTAX] Неправильное написание начальной функции"),
		ERROR_ENTRY(601, "[SYNTAX] Не указана скобка после имени функции в объявлении функции"),
		ERROR_ENTRY(602, "[SYNTAX] Неправильно написаны параметры в объявлении функции"),
		ERROR_ENTRY(603, "[SYNTAX] Неверное написание команды внутри функции"),
		ERROR_ENTRY(604, "[SYNTAX] Неверное написание переменной(литерала, функции) которую будет возвращаться(выводиться на консоль)"),
		ERROR_ENTRY(605, "[SYNTAX] Неверное написане тела цикла"),
		ERROR_ENTRY(606, "[SYNTAX] Неверное написание команды внутри функции"),
		ERROR_ENTRY(607, "[SYNTAX] Неверное написание условия внутри (if/round)"),
		ERROR_ENTRY(608, "[SYNTAX] Не указана скобка после имени функции при вызове ее"),
		ERROR_ENTRY(609, "[SYNTAX] Неправильно написано выражение"),
		ERROR_ENTRY(610, "[SYNTAX] Неправильно написаны параметры при вызове функции"),
		ERROR_ENTRY(611, "[SYNTAX] Неправильно написано выражение"),
		ERROR_ENTRY(612, "[SYNTAX] Неправильно написаны команды внутри блока (if/round)"),
		ERROR_ENTRY(613, "[SYNTAX] Неверный номер правила"),
		ERROR_ENTRY_NODEF(614),
		ERROR_ENTRY_NODEF(615),
		ERROR_ENTRY_NODEF(616),
		ERROR_ENTRY_NODEF(617),
		ERROR_ENTRY_NODEF(618),
		ERROR_ENTRY_NODEF(619),
		ERROR_ENTRY_NODEF10(620),
		ERROR_ENTRY_NODEF10(630),
		ERROR_ENTRY_NODEF10(640),
		ERROR_ENTRY_NODEF10(650),
		ERROR_ENTRY_NODEF10(660),
		ERROR_ENTRY_NODEF10(670),
		ERROR_ENTRY(680, "[SEMANTIC] Ошибка написания условия в блоке IF"),
		ERROR_ENTRY(681, "[SEMANTIC] Ошибка присвоения переменной одного типа данных значения литерала соответствующего другому типу"),
		ERROR_ENTRY(682, "[SEMANTIC] Ошибка присвоения переменной одного типа данных значения функции соответствующей другому типу"),
		ERROR_ENTRY(683, "[SEMANTIC] Ошибка возвращаемое значение функции не соответствует значению типа функции"),
		ERROR_ENTRY(684, "[SEMANTIC] Ошибка не совпадает количество параметров вызываемой и объявленной функции "),
		ERROR_ENTRY(685, "[SEMANTIC] Ошибка не совпадение типов параметров в вызываемой и объявленной функции"),
		ERROR_ENTRY(686, "[SEMANTIC] Ошибка на соответствие  типов операндов арифметическому оператору"),
		ERROR_ENTRY(687, "[SEMANTIC] Ошибка присвоения переменной одного типа данных результата выражения соответствующего другому типу"),
		ERROR_ENTRY(688, "[SEMANTIC] Ошибка в выражении не может использоваться тип string, за исключением как параметр библиотечной функции"),
		ERROR_ENTRY(689, "[SEMANTIC] Ошибка операнд по типу не соответствует оператору"),
		ERROR_ENTRY(690, "[SEMANTIC] Ошибка написания условия в блоке Round"),
		ERROR_ENTRY(691, "[SEMANTIC] Ошибка присвоения переменной одного типа данных другого типа данных"),
		ERROR_ENTRY_NODEF(692),
		ERROR_ENTRY_NODEF(693),
		ERROR_ENTRY_NODEF(694),
		ERROR_ENTRY_NODEF(695),
		ERROR_ENTRY_NODEF(696),
		ERROR_ENTRY_NODEF(697),
		ERROR_ENTRY_NODEF(698),
		ERROR_ENTRY_NODEF(699),
		ERROR_ENTRY_NODEF100(700),
		ERROR_ENTRY_NODEF100(800),ERROR_ENTRY_NODEF100(900)
	};

/*ERROR_ENTRY(604, "Неверный операнд"),
		ERROR_ENTRY(605, "Неверное написание оператора"),
		ERROR_ENTRY(606, "Неверный вызов функции"),
		ERROR_ENTRY(607, "Неверное написание после имени функции"),
		ERROR_ENTRY(608, "Неверное написание условия в цикле"),*/
	ERROR geterror(int id)
	{
		ERROR e;
		e.id = (id > 0 && id < ERROR_MAX_ENTRY) ? id : 0;
		strcpy_s(e.message, errors[e.id].message);

		return e;
	}

	ERROR geterrorin(int id, int line = -1, int col = -1)
	{
		ERROR e;
		if (id > 0 && id < ERROR_MAX_ENTRY)
		{
			e = errors[id];
			e.inext.line = line;
			e.inext.col = col;
		}
		else
		{
			e = errors[0];
		}

		return e;
	}

	ERROR geterrors(int id, int line, int col)
	{
		ERROR e;

		e = geterror(id);
		e.inext.line = line;
		e.inext.col = col;

		std::cout << "\n";


		return e;
	}
	ERROR geterrors(int id, int line)
	{
		ERROR e;
		e = geterror(id);
		e.inext.line = line;
		std::cout << "\n";
		return e;
	}
}