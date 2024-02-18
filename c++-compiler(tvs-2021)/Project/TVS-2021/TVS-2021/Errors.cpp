#include "Errors.h"
#include"Addictions.h"
using namespace std;
namespace Error
{
	/* ����� ������:	0 - 99 - ��������� ������
						100 - 109 - ������ ����������
						110 - 119 - ������ �������� � ������ ������*/
	ERROR errors[ERROR_MAX_ENTRY] = // ������� ������
	{
		ERROR_ENTRY(0, "������������ ��� ������"),		// ��� ������ ��� ��������� 0 - ERROR_MAX_ENTRY
		ERROR_ENTRY(1, "��������� ����"),
		ERROR_ENTRY_NODEF(2), ERROR_ENTRY_NODEF(3), ERROR_ENTRY_NODEF(4), ERROR_ENTRY_NODEF(5),
		ERROR_ENTRY_NODEF(6), ERROR_ENTRY_NODEF(7), ERROR_ENTRY_NODEF(8), ERROR_ENTRY_NODEF(9),
		ERROR_ENTRY_NODEF10(10), ERROR_ENTRY_NODEF10(20), ERROR_ENTRY_NODEF10(30),ERROR_ENTRY_NODEF10(40), ERROR_ENTRY_NODEF10(50),
		ERROR_ENTRY_NODEF10(60), ERROR_ENTRY_NODEF10(70), ERROR_ENTRY_NODEF10(80),ERROR_ENTRY_NODEF10(90),
		ERROR_ENTRY(100, "�������� -in ������ ���� �����"),
		ERROR_ENTRY_NODEF(101), ERROR_ENTRY_NODEF(102), ERROR_ENTRY_NODEF(103),
		ERROR_ENTRY(104, "��������� ����� �������� ���������"),
		ERROR_ENTRY_NODEF(105), ERROR_ENTRY_NODEF(106), ERROR_ENTRY_NODEF(107),
		ERROR_ENTRY_NODEF(108), ERROR_ENTRY_NODEF(109),
		ERROR_ENTRY(110, "������ ��� �������� ����� � �������� ����� (-in)"),
		ERROR_ENTRY(111, "������������ ������ � �������� ����� (-in)"),
		ERROR_ENTRY(112, "������ ��� �������� ���������(-log)"),
		ERROR_ENTRY(113,  "������ ��� �������� �������� ����� Out.txt"),//�����!
		ERROR_ENTRY_NODEF(114), ERROR_ENTRY_NODEF(115),
		ERROR_ENTRY_NODEF(116), ERROR_ENTRY_NODEF(117), ERROR_ENTRY_NODEF(118), ERROR_ENTRY_NODEF(119),
		ERROR_ENTRY(120, "[LEXICAL]��������� ������������ ���������� ����� � ������� ������"),
		ERROR_ENTRY(121, "[LEXICAL]��������� ������������ ������� ������� ������"),
		ERROR_ENTRY(122, "[LEXICAL]����� �� ������� ������� ������"),
		ERROR_ENTRY(123, "[LEXICAL]������������� ���������� ����������"),
		ERROR_ENTRY(124, "[LEXICAL]������������� ���������� �������"),
		ERROR_ENTRY(125, "[LEXICAL]���������� ����� ���������"),
		ERROR_ENTRY(126,"[LEXICAL]������������� �� ��������"),
		ERROR_ENTRY(127, "[LEXICAL] ������������� �������� � ����������"),
		ERROR_ENTRY_NODEF(128),
		ERROR_ENTRY(129, "[LEXICAL]������������ �������"),
		ERROR_ENTRY(130, "[LEXICAL]����������� ����� �����"),
		ERROR_ENTRY(131, "[LEXICAL]��������� ����� �����"),
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
		ERROR_ENTRY(160, "��������� ������������ ���������� ����� � ������� ���������������"),
		ERROR_ENTRY(161, "��������� ������������ ������� ������� ���������������"),
		ERROR_ENTRY(162, "����� �� ������� ������� ���������������"),
		ERROR_ENTRY_NODEF(163),
		ERROR_ENTRY_NODEF(164),
		ERROR_ENTRY_NODEF(165),
		ERROR_ENTRY_NODEF(166),
		ERROR_ENTRY_NODEF(167),
		ERROR_ENTRY_NODEF(168),
		ERROR_ENTRY_NODEF(169),
		ERROR_ENTRY_NODEF10(170), ERROR_ENTRY_NODEF10(180),ERROR_ENTRY_NODEF10(190),
		ERROR_ENTRY_NODEF100(200), ERROR_ENTRY_NODEF100(300), ERROR_ENTRY_NODEF100(400),ERROR_ENTRY_NODEF100(500),
		ERROR_ENTRY(600, "[SYNTAX] ������������ ��������� ��������� �������"),
		ERROR_ENTRY(601, "[SYNTAX] �� ������� ������ ����� ����� ������� � ���������� �������"),
		ERROR_ENTRY(602, "[SYNTAX] ����������� �������� ��������� � ���������� �������"),
		ERROR_ENTRY(603, "[SYNTAX] �������� ��������� ������� ������ �������"),
		ERROR_ENTRY(604, "[SYNTAX] �������� ��������� ����������(��������, �������) ������� ����� ������������(���������� �� �������)"),
		ERROR_ENTRY(605, "[SYNTAX] �������� �������� ���� �����"),
		ERROR_ENTRY(606, "[SYNTAX] �������� ��������� ������� ������ �������"),
		ERROR_ENTRY(607, "[SYNTAX] �������� ��������� ������� ������ (if/round)"),
		ERROR_ENTRY(608, "[SYNTAX] �� ������� ������ ����� ����� ������� ��� ������ ��"),
		ERROR_ENTRY(609, "[SYNTAX] ����������� �������� ���������"),
		ERROR_ENTRY(610, "[SYNTAX] ����������� �������� ��������� ��� ������ �������"),
		ERROR_ENTRY(611, "[SYNTAX] ����������� �������� ���������"),
		ERROR_ENTRY(612, "[SYNTAX] ����������� �������� ������� ������ ����� (if/round)"),
		ERROR_ENTRY(613, "[SYNTAX] �������� ����� �������"),
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
		ERROR_ENTRY(680, "[SEMANTIC] ������ ��������� ������� � ����� IF"),
		ERROR_ENTRY(681, "[SEMANTIC] ������ ���������� ���������� ������ ���� ������ �������� �������� ���������������� ������� ����"),
		ERROR_ENTRY(682, "[SEMANTIC] ������ ���������� ���������� ������ ���� ������ �������� ������� ��������������� ������� ����"),
		ERROR_ENTRY(683, "[SEMANTIC] ������ ������������ �������� ������� �� ������������� �������� ���� �������"),
		ERROR_ENTRY(684, "[SEMANTIC] ������ �� ��������� ���������� ���������� ���������� � ����������� ������� "),
		ERROR_ENTRY(685, "[SEMANTIC] ������ �� ���������� ����� ���������� � ���������� � ����������� �������"),
		ERROR_ENTRY(686, "[SEMANTIC] ������ �� ������������  ����� ��������� ��������������� ���������"),
		ERROR_ENTRY(687, "[SEMANTIC] ������ ���������� ���������� ������ ���� ������ ���������� ��������� ���������������� ������� ����"),
		ERROR_ENTRY(688, "[SEMANTIC] ������ � ��������� �� ����� �������������� ��� string, �� ����������� ��� �������� ������������ �������"),
		ERROR_ENTRY(689, "[SEMANTIC] ������ ������� �� ���� �� ������������� ���������"),
		ERROR_ENTRY(690, "[SEMANTIC] ������ ��������� ������� � ����� Round"),
		ERROR_ENTRY(691, "[SEMANTIC] ������ ���������� ���������� ������ ���� ������ ������� ���� ������"),
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

/*ERROR_ENTRY(604, "�������� �������"),
		ERROR_ENTRY(605, "�������� ��������� ���������"),
		ERROR_ENTRY(606, "�������� ����� �������"),
		ERROR_ENTRY(607, "�������� ��������� ����� ����� �������"),
		ERROR_ENTRY(608, "�������� ��������� ������� � �����"),*/
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