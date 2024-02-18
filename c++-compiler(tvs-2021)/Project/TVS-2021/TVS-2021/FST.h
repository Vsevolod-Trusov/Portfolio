#include<iostream>
using namespace std;
//типы данных vshort string boolean
#define FST_VSHORT FST::FST(7,\
	FST::NODE(1,FST::RELATION('v',1)),\
	FST::NODE(1,FST::RELATION('s',2)),\
	FST::NODE(1,FST::RELATION('h',3)),\
	FST::NODE(1,FST::RELATION('o',4)),\
	FST::NODE(1,FST::RELATION('r',5)),\
	FST::NODE(1,FST::RELATION('t',6)),\
	FST::NODE())

#define FST_STRING FST::FST(7,\
	FST::NODE(1,FST::RELATION('s',1)),\
	FST::NODE(1,FST::RELATION('t',2)),\
	FST::NODE(1,FST::RELATION('r',3)),\
	FST::NODE(1,FST::RELATION('i',4)),\
	FST::NODE(1,FST::RELATION('n',5)),\
	FST::NODE(1,FST::RELATION('g',6)),\
	FST::NODE())

#define FST_BOOLEAN FST::FST(8,\
	FST::NODE(1,FST::RELATION('b',1)),\
	FST::NODE(1,FST::RELATION('o',2)),\
	FST::NODE(1,FST::RELATION('o',3)),\
	FST::NODE(1,FST::RELATION('l',4)),\
	FST::NODE(1,FST::RELATION('e',5)),\
	FST::NODE(1,FST::RELATION('a',6)),\
	FST::NODE(1,FST::RELATION('n',7)),\
	FST::NODE())

// функция и имена библеотечных функций и слово для вывода(output)
#define FST_FUNCTION FST::FST(9,\
	FST::NODE(1,FST::RELATION('f',1)),\
	FST::NODE(1,FST::RELATION('u',2)),\
	FST::NODE(1,FST::RELATION('n',3)),\
	FST::NODE(1,FST::RELATION('c',4)),\
	FST::NODE(1,FST::RELATION('t',5)),\
	FST::NODE(1,FST::RELATION('i',6)),\
	FST::NODE(1,FST::RELATION('o',7)),\
	FST::NODE(1,FST::RELATION('n',8)),\
	FST::NODE())

#define FST_CONVERT FST::FST(8,\
	FST::NODE(1,FST::RELATION('C',1)),\
	FST::NODE(1,FST::RELATION('o',2)),\
	FST::NODE(1,FST::RELATION('n',3)),\
	FST::NODE(1,FST::RELATION('v',4)),\
	FST::NODE(1,FST::RELATION('e',5)),\
	FST::NODE(1,FST::RELATION('r',6)),\
	FST::NODE(1,FST::RELATION('t',7)),\
	FST::NODE())

#define FST_LENGTH FST::FST(10,\
	FST::NODE(1,FST::RELATION('S',1)),\
	FST::NODE(1,FST::RELATION('t',2)),\
	FST::NODE(1,FST::RELATION('r',3)),\
	FST::NODE(1,FST::RELATION('L',4)),\
	FST::NODE(1,FST::RELATION('e',5)),\
	FST::NODE(1,FST::RELATION('n',6)),\
	FST::NODE(1,FST::RELATION('g',7)),\
	FST::NODE(1,FST::RELATION('t',8)),\
	FST::NODE(1,FST::RELATION('h',9)),\
	FST::NODE())


#define FST_COMPARE FST::FST(8,\
	FST::NODE(1,FST::RELATION('C',1)),\
	FST::NODE(1,FST::RELATION('o',2)),\
	FST::NODE(1,FST::RELATION('m',3)),\
	FST::NODE(1,FST::RELATION('p',4)),\
	FST::NODE(1,FST::RELATION('a',5)),\
	FST::NODE(1,FST::RELATION('r',6)),\
	FST::NODE(1,FST::RELATION('e',7)),\
	FST::NODE())

#define FST_OUTPUT FST::FST(7,\
	FST::NODE(1,FST::RELATION('o',1)),\
	FST::NODE(1,FST::RELATION('u',2)),\
	FST::NODE(1,FST::RELATION('t',3)),\
	FST::NODE(1,FST::RELATION('p',4)),\
	FST::NODE(1,FST::RELATION('u',5)),\
	FST::NODE(1,FST::RELATION('t',6)),\
	FST::NODE())

#define FST_OUTPUTS FST::FST(8,\
	FST::NODE(1,FST::RELATION('o',1)),\
	FST::NODE(1,FST::RELATION('u',2)),\
	FST::NODE(1,FST::RELATION('t',3)),\
	FST::NODE(1,FST::RELATION('p',4)),\
	FST::NODE(1,FST::RELATION('u',5)),\
	FST::NODE(1,FST::RELATION('t',6)),\
	FST::NODE(1,FST::RELATION('s',7)),\
	FST::NODE())


// set, retrieve, Program
#define FST_SET FST::FST(4,\
	FST::NODE(1,FST::RELATION('s',1)),\
	FST::NODE(1,FST::RELATION('e',2)),\
	FST::NODE(1,FST::RELATION('t',3)),\
	FST::NODE())

#define FST_RETRIEVE FST::FST(9,\
	FST::NODE(1,FST::RELATION('r',1)),\
	FST::NODE(1,FST::RELATION('e',2)),\
	FST::NODE(1,FST::RELATION('t',3)),\
	FST::NODE(1,FST::RELATION('r',4)),\
	FST::NODE(1,FST::RELATION('i',5)),\
	FST::NODE(1,FST::RELATION('e',6)),\
	FST::NODE(1,FST::RELATION('v',7)),\
	FST::NODE(1,FST::RELATION('e',8)),\
	FST::NODE())

#define FST_PROGRAM FST::FST(8,\
	FST::NODE(1,FST::RELATION('P',1)),\
	FST::NODE(1,FST::RELATION('r',2)),\
	FST::NODE(1,FST::RELATION('o',3)),\
	FST::NODE(1,FST::RELATION('g',4)),\
	FST::NODE(1,FST::RELATION('r',5)),\
	FST::NODE(1,FST::RELATION('a',6)),\
	FST::NODE(1,FST::RELATION('m',7)),\
	FST::NODE())

// арифметические операторы и операторы сравнения

#define FST_PLUS FST::FST(2,\
	FST::NODE(1,FST::RELATION('+',1)),\
	FST::NODE())

#define FST_MINUS FST::FST(2,\
	FST::NODE(1,FST::RELATION('-',1)),\
	FST::NODE())

#define FST_MULTIPLICATION FST::FST(2,\
	FST::NODE(1,FST::RELATION('*',1)),\
	FST::NODE())

#define FST_DIRSLASH FST::FST(2,\
	FST::NODE(1,FST::RELATION('/',1)),\
	FST::NODE())

#define FST_PERCENT FST::FST(2,\
	FST::NODE(1,FST::RELATION('%',1)),\
	FST::NODE())

#define FST_MORE FST::FST(2,\
	FST::NODE(1,FST::RELATION('>',1)),\
	FST::NODE())

#define FST_LESS FST::FST(2,\
	FST::NODE(1,FST::RELATION('<',1)),\
	FST::NODE())

#define FST_TILDE FST::FST(2,\
	FST::NODE(1,FST::RELATION('~',1)),\
	FST::NODE())//равенство ==

#define FST_EXMARK FST::FST(2,\
	FST::NODE(1,FST::RELATION('!',1)),\
	FST::NODE())//неравенство !=

#define FST_MOREOREQUALS FST::FST(2,\
	FST::NODE(1,FST::RELATION(':',1)),\
	FST::NODE())// :

#define FST_LESSOREQUALS FST::FST(2,\
	FST::NODE(1,FST::RELATION('^',1)),\
	FST::NODE())// ^

//круглые и фигурные скобки, запятая и точка с запятой, равно

#define FST_LEFTTHESIS FST::FST(2,\
	FST::NODE(1,FST::RELATION('(',1)),\
	FST::NODE())

#define FST_RIGHTTHESIS FST::FST(2,\
	FST::NODE(1,FST::RELATION(')',1)),\
	FST::NODE())

#define FST_SEMICOLON FST::FST(2,\
	FST::NODE(1,FST::RELATION(';',1)),\
	FST::NODE())

#define FST_COMMA FST::FST(2,\
	FST::NODE(1,FST::RELATION(',',1)),\
	FST::NODE())

#define FST_LEFTBRACE FST::FST(2,\
	FST::NODE(1,FST::RELATION('{',1)),\
	FST::NODE())

#define FST_BRACELET FST::FST(2,\
	FST::NODE(1,FST::RELATION('}',1)),\
	FST::NODE())

#define FST_EQUALS FST::FST(2,\
	FST::NODE(1,FST::RELATION('=',1)),\
	FST::NODE())
// if, else 
#define FST_IF FST::FST(3,\
	FST::NODE(1,FST::RELATION('i',1)),\
	FST::NODE(1,FST::RELATION('f',2)),\
	FST::NODE())

#define FST_ELSE FST::FST(5,\
	FST::NODE(1,FST::RELATION('e',1)),\
	FST::NODE(1,FST::RELATION('l',2)),\
	FST::NODE(1,FST::RELATION('s',3)),\
	FST::NODE(1,FST::RELATION('e',4)),\
	FST::NODE())	


#define FST_ROUND FST::FST(6,\
	FST::NODE(1,FST::RELATION('R',1)),\
	FST::NODE(1,FST::RELATION('o',2)),\
	FST::NODE(1,FST::RELATION('u',3)),\
	FST::NODE(1,FST::RELATION('n',4)),\
	FST::NODE(1,FST::RELATION('d',5)),\
	FST::NODE())	

//true, false

#define FST_TRUE FST::FST(5,\
	FST::NODE(1,FST::RELATION('t',1)),\
	FST::NODE(1,FST::RELATION('r',2)),\
	FST::NODE(1,FST::RELATION('u',3)),\
	FST::NODE(1,FST::RELATION('e',4)),\
	FST::NODE())	

#define FST_FALSE FST::FST(6,\
	FST::NODE(1,FST::RELATION('f',1)),\
	FST::NODE(1,FST::RELATION('a',2)),\
	FST::NODE(1,FST::RELATION('l',3)),\
	FST::NODE(1,FST::RELATION('s',4)),\
	FST::NODE(1,FST::RELATION('e',5)),\
	FST::NODE()	)
//идентификатор и литералы

#define FST_ID FST::FST(2, \
	FST::NODE(106,	\
	FST::RELATION('_', 0),\
	FST::RELATION('a', 0), FST::RELATION('b', 0), FST::RELATION('c', 0), \
	FST::RELATION('d', 0), FST::RELATION('e', 0), FST::RELATION('f', 0),\
	FST::RELATION('g', 0), FST::RELATION('h', 0), FST::RELATION('i', 0), \
	FST::RELATION('j', 0), FST::RELATION('k', 0), FST::RELATION('l', 0),\
	FST::RELATION('m', 0), FST::RELATION('n', 0), FST::RELATION('o', 0), \
	FST::RELATION('p', 0), FST::RELATION('q', 0), FST::RELATION('r', 0),\
	FST::RELATION('s', 0), FST::RELATION('t', 0), FST::RELATION('u', 0), \
	FST::RELATION('v', 0), FST::RELATION('w', 0), FST::RELATION('x', 0),\
	FST::RELATION('y', 0), FST::RELATION('z', 0),\
	\
	FST::RELATION('_', 1),\
	FST::RELATION('a', 1), FST::RELATION('b', 1), FST::RELATION('c', 1), \
	FST::RELATION('d', 1), FST::RELATION('e', 1), FST::RELATION('f', 1),\
	FST::RELATION('g', 1), FST::RELATION('h', 1), FST::RELATION('i', 1), \
	FST::RELATION('j', 1), FST::RELATION('k', 1), FST::RELATION('l', 1),\
	FST::RELATION('m', 1), FST::RELATION('n', 1), FST::RELATION('o', 1), \
	FST::RELATION('p', 1), FST::RELATION('q', 1), FST::RELATION('r', 1),\
	FST::RELATION('s', 1), FST::RELATION('t', 1), FST::RELATION('u', 1), \
	FST::RELATION('v', 1), FST::RELATION('w', 1), FST::RELATION('x', 1),\
	FST::RELATION('y', 1), FST::RELATION('z', 1),\
	\
	FST::RELATION('A', 0), FST::RELATION('B', 0), FST::RELATION('C', 0), \
	FST::RELATION('D', 0), FST::RELATION('E', 0), FST::RELATION('F', 0),\
	FST::RELATION('G', 0), FST::RELATION('H', 0), FST::RELATION('I', 0), \
	FST::RELATION('J', 0), FST::RELATION('K', 0), FST::RELATION('L', 0),\
	FST::RELATION('M', 0), FST::RELATION('N', 0), FST::RELATION('O', 0), \
	FST::RELATION('P', 0), FST::RELATION('Q', 0), FST::RELATION('R', 0),\
	FST::RELATION('S', 0), FST::RELATION('T', 0), FST::RELATION('U', 0), \
	FST::RELATION('V', 0), FST::RELATION('W', 0), FST::RELATION('X', 0),\
	FST::RELATION('Y', 0), FST::RELATION('Z', 0),\
	\
	FST::RELATION('A', 1), FST::RELATION('B', 1), FST::RELATION('C', 1), \
	FST::RELATION('D', 1), FST::RELATION('E', 1), FST::RELATION('F', 1),\
	FST::RELATION('G', 1), FST::RELATION('H', 1), FST::RELATION('I', 1), \
	FST::RELATION('J', 1), FST::RELATION('K', 1), FST::RELATION('L', 1),\
	FST::RELATION('M', 1), FST::RELATION('N', 1), FST::RELATION('O', 1), \
	FST::RELATION('P', 1), FST::RELATION('Q', 1), FST::RELATION('R', 1),\
	FST::RELATION('S', 1), FST::RELATION('T', 1), FST::RELATION('U', 1), \
	FST::RELATION('V', 1), FST::RELATION('W', 1), FST::RELATION('X', 1),\
	FST::RELATION('Y', 1), FST::RELATION('Z', 1)\
	\
	),\
	FST::NODE(116, \
	FST::RELATION('_', 0), \
	FST::RELATION('a', 0), FST::RELATION('b',0), FST::RELATION('c', 0), \
	FST::RELATION('d', 0), FST::RELATION('e',0), FST::RELATION('f', 0), \
	FST::RELATION('g', 0), FST::RELATION('h',0), FST::RELATION('i', 0), \
	FST::RELATION('j', 0), FST::RELATION('k',0), FST::RELATION('l', 0), \
	FST::RELATION('m', 0), FST::RELATION('n',0), FST::RELATION('o', 0), \
	FST::RELATION('p', 0), FST::RELATION('q',0), FST::RELATION('r', 0), \
	FST::RELATION('s', 0), FST::RELATION('t',0), FST::RELATION('u', 0), \
	FST::RELATION('v', 0), FST::RELATION('w',0), FST::RELATION('x', 0), \
	FST::RELATION('y', 0), FST::RELATION('z',0), \
	\
	FST::RELATION('A', 0), FST::RELATION('B', 0), FST::RELATION('C', 0), \
	FST::RELATION('D', 0), FST::RELATION('E', 0), FST::RELATION('F', 0), \
	FST::RELATION('G', 0), FST::RELATION('H', 0), FST::RELATION('I', 0), \
	FST::RELATION('J', 0), FST::RELATION('K', 0), FST::RELATION('L', 0), \
	FST::RELATION('M', 0), FST::RELATION('N', 0), FST::RELATION('O', 0), \
	FST::RELATION('P', 0), FST::RELATION('Q', 0), FST::RELATION('R', 0), \
	FST::RELATION('S', 0), FST::RELATION('T', 0), FST::RELATION('U', 0), \
	FST::RELATION('V', 0), FST::RELATION('W', 0), FST::RELATION('X', 0), \
	FST::RELATION('Y', 0), FST::RELATION('Z', 0), \
	\
	FST::RELATION('_', 1), \
	FST::RELATION('a', 1), FST::RELATION('b', 1), FST::RELATION('c', 1), \
	FST::RELATION('d', 1), FST::RELATION('e', 1), FST::RELATION('f', 1), \
	FST::RELATION('g', 1), FST::RELATION('h', 1), FST::RELATION('i', 1), \
	FST::RELATION('j', 1), FST::RELATION('k', 1), FST::RELATION('l', 1), \
	FST::RELATION('m', 1), FST::RELATION('n', 1), FST::RELATION('o', 1), \
	FST::RELATION('p', 1), FST::RELATION('q', 1), FST::RELATION('r', 1), \
	FST::RELATION('s', 1), FST::RELATION('t', 1), FST::RELATION('u', 1), \
	FST::RELATION('v', 1), FST::RELATION('w', 1), FST::RELATION('x', 1), \
	FST::RELATION('y', 1), FST::RELATION('z', 1), \
	\
	FST::RELATION('A', 1), FST::RELATION('B', 1), FST::RELATION('C', 1), \
	FST::RELATION('D', 1), FST::RELATION('E', 1), FST::RELATION('F', 1), \
	FST::RELATION('G', 1), FST::RELATION('H', 1), FST::RELATION('I', 1), \
	FST::RELATION('J', 1), FST::RELATION('K', 1), FST::RELATION('L', 1), \
	FST::RELATION('M', 1), FST::RELATION('N', 1), FST::RELATION('O', 1), \
	FST::RELATION('P', 1), FST::RELATION('Q', 1), FST::RELATION('R', 1), \
	FST::RELATION('S', 1), FST::RELATION('T', 1), FST::RELATION('U', 1), \
	FST::RELATION('V', 1), FST::RELATION('W', 1), FST::RELATION('X', 1), \
	FST::RELATION('Y', 1), FST::RELATION('Z', 1), \
	\
	FST::RELATION('1', 1), FST::RELATION('2',1), FST::RELATION('3', 1), \
	FST::RELATION('4', 1), FST::RELATION('5',1), FST::RELATION('6', 1), \
	FST::RELATION('7', 1), FST::RELATION('8',1), FST::RELATION('9', 1), \
	FST::RELATION('0', 1)), \
	FST::NODE())

#define FST_STRING_LITERAL FST::FST(3,\
	FST::NODE(1, FST::RELATION('\"', 1)),\
	FST::NODE(152,\
	FST::RELATION('.', 1),\
	FST::RELATION(',', 1),\
	FST::RELATION('a', 1),\
	FST::RELATION('b', 1),\
	FST::RELATION('c', 1),\
	FST::RELATION('d', 1),\
	FST::RELATION('e', 1),\
	FST::RELATION('f', 1),\
	FST::RELATION('g', 1),\
	FST::RELATION('h', 1),\
	FST::RELATION('i', 1),\
	FST::RELATION('j', 1),\
	FST::RELATION('k', 1),\
	FST::RELATION('l', 1),\
	FST::RELATION('m', 1),\
	FST::RELATION('n', 1),\
	FST::RELATION('o', 1),\
	FST::RELATION('p', 1),\
	FST::RELATION('q', 1),\
	FST::RELATION('r', 1),\
	FST::RELATION('s', 1),\
	FST::RELATION('t', 1),\
	FST::RELATION('u', 1),\
	FST::RELATION('v', 1),\
	FST::RELATION('w', 1),\
	FST::RELATION('x', 1),\
	FST::RELATION('y', 1),\
	FST::RELATION('z', 1),\
	FST::RELATION('а', 1),\
	FST::RELATION('б', 1),\
	FST::RELATION('в', 1),\
	FST::RELATION('г', 1),\
	FST::RELATION('д', 1),\
	FST::RELATION('е', 1),\
	FST::RELATION('ж', 1),\
	FST::RELATION('з', 1),\
	FST::RELATION('и', 1),\
	FST::RELATION('й', 1),\
	FST::RELATION('к', 1),\
	FST::RELATION('л', 1),\
	FST::RELATION('м', 1),\
	FST::RELATION('н', 1),\
	FST::RELATION('о', 1),\
	FST::RELATION('п', 1),\
	FST::RELATION('р', 1),\
	FST::RELATION('с', 1),\
	FST::RELATION('т', 1),\
	FST::RELATION('у', 1),\
	FST::RELATION('ф', 1),\
	FST::RELATION('х', 1),\
	FST::RELATION('ц', 1),\
	FST::RELATION('ч', 1),\
	FST::RELATION('ш', 1),\
	FST::RELATION('щ', 1),\
	FST::RELATION('ъ', 1),\
	FST::RELATION('ы', 1),\
	FST::RELATION('ь', 1),\
	FST::RELATION('э', 1),\
	FST::RELATION('ю', 1),\
	FST::RELATION('я', 1),\
	FST::RELATION('A', 1),\
	FST::RELATION('B', 1),\
	FST::RELATION('C', 1),\
	FST::RELATION('D', 1),\
	FST::RELATION('E', 1),\
	FST::RELATION('F', 1),\
	FST::RELATION('G', 1),\
	FST::RELATION('H', 1),\
	FST::RELATION('I', 1),\
	FST::RELATION('J', 1),\
	FST::RELATION('K', 1),\
	FST::RELATION('L', 1),\
	FST::RELATION('M', 1),\
	FST::RELATION('N', 1),\
	FST::RELATION('O', 1),\
	FST::RELATION('P', 1),\
	FST::RELATION('Q', 1),\
	FST::RELATION('R', 1),\
	FST::RELATION('S', 1),\
	FST::RELATION('T', 1),\
	FST::RELATION('U', 1),\
	FST::RELATION('V', 1),\
	FST::RELATION('W', 1),\
	FST::RELATION('X', 1),\
	FST::RELATION('Y', 1),\
	FST::RELATION('Z', 1),\
	FST::RELATION('А', 1),\
	FST::RELATION('Б', 1),\
	FST::RELATION('В', 1),\
	FST::RELATION('Г', 1),\
	FST::RELATION('Д', 1),\
	FST::RELATION('Е', 1),\
	FST::RELATION('Ж', 1),\
	FST::RELATION('З', 1),\
	FST::RELATION('И', 1),\
	FST::RELATION('Й', 1),\
	FST::RELATION('К', 1),\
	FST::RELATION('Л', 1),\
	FST::RELATION('М', 1),\
	FST::RELATION('Н', 1),\
	FST::RELATION('О', 1),\
	FST::RELATION('П', 1),\
	FST::RELATION('Р', 1),\
	FST::RELATION('С', 1),\
	FST::RELATION('Т', 1),\
	FST::RELATION('У', 1),\
	FST::RELATION('Ф', 1),\
	FST::RELATION('Х', 1),\
	FST::RELATION('Ц', 1),\
	FST::RELATION('Ч', 1),\
	FST::RELATION('Ш', 1),\
	FST::RELATION('Щ', 1),\
	FST::RELATION('Ъ', 1),\
	FST::RELATION('Ы', 1),\
	FST::RELATION('Ь', 1),\
	FST::RELATION('Э', 1),\
	FST::RELATION('Ю', 1),\
	FST::RELATION('Я', 1),\
	FST::RELATION('ё', 1),\
	FST::RELATION('Ё', 1),\
	FST::RELATION('0', 1),\
	FST::RELATION('1', 1),\
	FST::RELATION('2', 1),\
	FST::RELATION('3', 1),\
	FST::RELATION('4', 1),\
	FST::RELATION('5', 1),\
	FST::RELATION('6', 1),\
	FST::RELATION('7', 1),\
	FST::RELATION('8', 1),\
	FST::RELATION('9', 1),\
	FST::RELATION(' ', 1),\
	FST::RELATION('=', 1),\
	FST::RELATION('~', 1),\
	FST::RELATION('!', 1),\
	FST::RELATION('>', 1),\
	FST::RELATION('<', 1),\
	FST::RELATION(':', 1),\
	FST::RELATION('^', 1),\
	FST::RELATION('$', 1),\
	FST::RELATION('#', 1),\
	FST::RELATION('(', 1),\
	FST::RELATION(')', 1),\
	FST::RELATION('{', 1),\
	FST::RELATION('}', 1),\
	FST::RELATION('+', 1),\
	FST::RELATION('-', 1),\
	FST::RELATION('*', 1),\
	FST::RELATION('/', 1),\
	FST::RELATION('%', 1),\
	FST::RELATION('_', 1),\
	FST::RELATION('\'', 1),\
	FST::RELATION('\"', 2)\
	),\
	FST::NODE())

#define FST_VSHORT_LITERAL FST::FST(1,\
	FST::NODE(10,\
	FST::RELATION('0', 0),\
	FST::RELATION('1', 0),\
	FST::RELATION('2', 0),\
	FST::RELATION('3', 0),\
	FST::RELATION('4', 0),\
	FST::RELATION('5', 0),\
	FST::RELATION('6', 0),\
	FST::RELATION('7', 0),\
	FST::RELATION('8', 0),\
	FST::RELATION('9', 0)\
	),\
	FST::NODE())

namespace FST
{
	struct RELATION									// ребро:символ -> вершина графа переходов КА
	{
		char symbol;								// символ перехода
		short nnode;								// номер смежной строки
		RELATION(
			char c = 0x00,							// символ перехода
			short ns = NULL							// новое состояние
		);
	};
	struct NODE										// вершина графа переходов
	{
		short n_relation;							//  кличество инцидентных ребер
		RELATION* relations;						// инцидентные ребра
		NODE();
		NODE(
			short n,
			RELATION rel, ...						//список ребер
		);
	};
	struct FST										// недетерминированный конечный автомат
	{
		short position;								// текущая позиция в цепочке
		short nstates;								// количество состояний автомата
		NODE* nodes;								// граф переходов: [0]-начальное состояние, [nstate-1] - конечные возможние
		short* rstates;								// состояния автомата на данной позиции
		FST(
			short ns,
			NODE n, ...
		);
	};
	bool execute(									// выполнить распознвание цепочки
		const char* string,
		FST fst,									// недетерминированный конечный автомат
		int col = 0
	);
	bool step(const char* string, FST& fst, short*& rstates, int& col);
}