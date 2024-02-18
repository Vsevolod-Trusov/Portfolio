#include "Alphabet.h"
#include "Errors.h"
#include "Addictions.h"
#include "LexAnalysis.h"


namespace In
{
    IN getin(wchar_t infile[])
    {
        bool fl = false,                    // флаг для кавычки но он будет использоваться при счете слов, и флаг для комментария
            fl_for_comment = false,         //$ флаг для отслеживания одгострочного комментария
            fl_for_many_comments = false;   //# флаг для отслеживания многострочного комментария
            
        std::ifstream fin;
        In::IN read{ 0, 0, 0, new unsigned char[IN_MAX_LEN_TEXT], IN_CODE_TABLE };
        unsigned short column = 0;
        int size = 4096,
            col = 0,
            row = 0,
            sz = 256,
            size1 = 500,
            index = 0,
            counter = 0;
           
        unsigned char** str = new unsigned char* [size];
        str[row] = new unsigned char[sz];
        int* CounterWordsInLine = new  int[size1];
        for (int i = 0; i < size1; i++)
        {
            CounterWordsInLine[i] = -1;
        }
        fin.open(infile);
        if (fin.fail()) {
            throw ERROR_THROW(110);
        }
        while (read.size < IN_MAX_LEN_TEXT) {
            unsigned char value = fin.get();
            if (fin.eof()) {
                read.text[read.size] = '\0';
                read.lines++;
                str[row][col++] = '\0';
                string last_str = reinterpret_cast<char*>(str[row]);
                if (last_str == "")                                                       //проверка на то какую мы считал последнюю строку пустую или с символами
                {                                                                         //из этого следует: будет эта строка обрабатываться лексическим анализатором или нет
                    CounterWordsInLine[index++] = counter;
                    counter = 0;
                }
                else
                {
                    CounterWordsInLine[index++] = ++counter;
                    counter = 0;
                    row++;
                }
                break;
            }
            if ((fl_for_comment && value != '\n')|| (fl_for_many_comments && value != '#'))
            {
                continue;
            }
            if (fl_for_comment && value == '\n')
            {
                fl_for_comment = false;
                continue;
            }
            if (fl_for_many_comments && value == '#')
            {
                fl_for_many_comments = false;
                continue;
            }
            if (read.code[value] == read.F) { 
                throw ERROR_THROW_IN(111, read.lines, column);
            }
            else if ((read.code[value] == read.I) || (read.code[read.text[read.size - 1]] == read.S && value == ' ' && fl != true)
                || (read.text[read.size - 1] == '|' && value == ' ') || (column == 0 && value == ' ')
                || (col == 0 && value == ' ') || (read.text[read.size - 1] == ' ' && read.code[value] == read.S && fl != true)
                )
            {
            
                if (read.code[value] == read.S && value != ' ' && read.text[read.size - 1] == ' '
                    && ((read.code[read.text[read.size - 2]] == read.T)                                 //example: fs_( -> fs(
                        || (read.code[read.text[read.size - 2]] == read.K))                             //example: '_;                        
                    )
                {
                    read.text[read.size - 1] = value;
                    str[row][col++] = value;
                    str[row][col++] = '\0';
                    col = 0;
                    str[++row] = new unsigned char[sz];
                    counter++;                                                                          // мы считали пробел после слоа поэтому к couner+1 
                }                                                                                       //а потом пробел заминили на символ поэтому чтобы его не пропускать добавляем еще +1
                else
                {
                    read.ignor++;
                }
            }
            else if (read.code[value] == read.K)
            {
                fl = !fl;
                read.text[read.size] = value;
                read.size++;
                column++;
                str[row][col++] = value;
            }
            else if ((fl == true && value == ' ')                                                       //проверка на пробел между кавычками
                || (fl == true && value == '{')                                                         //проверка на симолы { между кавычками
                || (fl == true && value == '}')                                                         //проверка на симолы } между кавычками
                || (fl == true && value == '(')                                                         //проверка на симолы ( между кавычками
                || (fl == true && value == ')')                                                         //проверка на симолы ) между кавычками
                || (fl == true && value == '=')                                                         //проверка на симолы = между кавычками
                || (fl == true && value == '-')                                                         //проверка на симолы - между кавычками
                || (fl == true && value == '+')                                                         //проверка на симолы + между кавычками
                || (fl == true && value == '%')                                                         //проверка на симолы % между кавычками
                || (fl == true && value == '/')                                                         //проверка на симолы / между кавычками
                || (fl == true && value == '*')                                                         //проверка на симолы * между кавычками
                || (fl == true && value == '!')                                                         //проверка на симолы ! между кавычками
                || (fl == true && value == '~')                                                         //проверка на симолы ~ между кавычками
                || (fl == true && value == '>')                                                         //проверка на симолы > между кавычками
                || (fl == true && value == '<')                                                         //проверка на симолы < между кавычками
                || (fl == true && value == '$')                                                         //проверка на симолы $ между кавычками
                || (fl == true && value == '#')                                                         //проверка на симолы # между кавычками
                || (fl == true && value == ':')                                                         //проверка на симолы : между кавычками
                || (fl == true && value == '^')                                                         //проверка на симолы ^ между кавычками
                || (fl == true && value == ',')                                                         //проверка на симолы , между кавычками
                || (fl == true && value == '.')                                                         //проверка на симолы . между кавычками
                || (fl == true && value == '_')                                                         //проверка на симолы _ между кавычками
                || (fl == true && value == '\'')                                                         //проверка на симолы _ между кавычками
                )
            {
                read.text[read.size] = value;
                read.size++;
                column++;
                str[row][col++] = value;
            }
            else if (read.code[value] == read.T && value == '$' )
            {
                fl_for_comment = true;
                continue;
            }
            else if (read.code[value] == read.T && value == '#')
            {
                fl_for_many_comments = !fl_for_many_comments;
                continue;
            }
            else if (read.code[value] == read.T) {
                read.text[read.size] = value;
                read.size++;
                column++;
                str[row][col++] = value;
            }
            else if ((read.code[value] == read.S && read.code[read.text[read.size - 1]] == read.T && value != ' ' && value != '\n')                                 //exaple: fi(
                || (read.code[value] == read.S && read.text[read.size - 1] == '|' && value != ' ' && value != '\n')                                                 //exaple: |{
                || (read.code[value] == read.S && read.code[read.text[read.size - 1]] == read.S && value != ' ' && value != '\n' && fl != true)                     //example *(
                || (read.code[value] == read.S && read.code[read.text[read.size - 1]] == read.K && value != ' ' && value != '\n')                                   //example ';
                )
            {
                read.text[read.size] = value;
                read.size++;
                column++;
                if (col == 0)                                                                                                                                       // example: ||{
                {
                    str[row][col++] = value;
                    str[row][col++] = '\0';
                    col = 0;
                    str[++row] = new unsigned char[sz];
                    ++counter;
                }
                else
                {
                    str[row][col++] = '\0';
                    col = 0;
                    str[++row] = new unsigned char[sz];
                    str[row][col++] = value;
                    str[row][col++] = '\0';
                    col = 0;
                    str[++row] = new unsigned char[sz];
                    counter += 2;
                }
            }
            else if ((value == '\n' && read.code[read.text[read.size - 1]] == read.S)                                                                           //считываем символ \n когда перед ним был пробел или символ-сепаратор(т.е в двумерном массиве сейчас пустая строка)
                || (value == '\n' && read.text[read.size - 1] == '|'))                                                                                             //или перед ним был символ \n
            {
                read.text[read.size] = read.code[value];
                read.size++;
                column++;
                CounterWordsInLine[index++] = counter;
                counter = 0;
            }
            else if (value == ' ') {                                                                                                                                // в этом блоке записываем в двумерный массив пробел идущий после символа букввы, и тем самым закрываем строку в двумерном массиве и создается новая
                read.text[read.size] = value;
                read.size++;
                column++;
                str[row][col++] = '\0';
                col = 0;
                str[++row] = new unsigned char[sz];
                ++counter;
            }
            if (value == IN_CODE_ENDL) {
                read.lines++;
                column = 0;
            }
        }
        read.pointer = str;
        read.counter_rows = row;
        read.CounterWordsinLine = CounterWordsInLine;
        //for (int i = 0; i < read.size; i++)                               //вывод в консоли считанных данных
        //{
        //    cout << read.text[i];
        //}
        //cout << '\n';
        //cout << '\n';
        //cout << "Количество слов в каждой строке входного файла in.txt: ";
        //for (int i = 0; CounterWordsInLine[i] != -1; i++)
        //{
        //    cout << CounterWordsInLine[i] << ' ';
        //}
        //cout << "\n";
        //cout << "\n";
        //output(read.pointer, read.counter_rows);
        fin.close();
        return read;
    }

    void output(unsigned char** words, int size)
    {
        unsigned char** text = words;                     //вывод считанного с файла кода
        for (int rows = 0; rows < size; rows++)
        {
            for (int colum = 0; text[rows][colum] != '\0'; colum++)
            {
                cout << text[rows][colum];
            }cout << endl;
        }
    }
}
