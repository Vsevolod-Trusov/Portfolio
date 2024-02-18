#define _CRT_SECURE_NO_WARNINGS
#include<iostream>
#include<string>
#include<Windows.h>
using namespace std;
extern "C" {
	bool __stdcall Compare(char* str1, char* str2)
	{
		if (str1 == NULL || str2 == NULL || strlen(str1) != strlen(str2))
			return false;
		if (strlen(str1) == strlen(str2))
		{
			for (int i = 0; i < strlen(str1); i++)
			{
				if (str1[i] > str2[i])
					return false;
				else if (str1[i] < str2[i])
					return false;
			}
			return true;
		}
	}

	short __stdcall StrLength(char* str)
	{
		return strlen(str);
	}

	short __stdcall  Convert(char* str)
	{
		bool fl_number = false;					//что есть хотя бы одно число
		short convert = (short)1;
		for (int i = 0; i < strlen(str); i++)
		{
			if (str[i] == '0' || str[i] == '1' || str[i] == '2' || str[i] == '3' || str[i] == '4' || str[i] == '5' ||
				str[i] == '6' || str[i] == '7' || str[i] == '8' || str[i] == '9')
			{
				fl_number = true;
				convert *= (short)str[i] - '0';
			}
		}
		if (!fl_number)
			convert = (short)25;
		return  (short)convert;
	}

	void __stdcall OutVShort(short number)
	{
		cout << number ;
	}
	void __stdcall  OutVShortL(short number)
	{
		cout << number << endl;
	}
	void __stdcall  OutBooleanL(bool value)
	{
		if (value)
			cout << "true" << endl;
		else
			cout << "false"<<endl;
	}
	void __stdcall OutBoolean(bool value)
	{
		if (value)
			cout << "true" ;
		else
			cout << "false";
	}
	void __stdcall OutStringL(char* str)
	{
		SetConsoleCP(1251);
		SetConsoleOutputCP(1251);
		cout << str<<endl;
	}
	void __stdcall OutString(char* str)
	{
		SetConsoleCP(1251);
		SetConsoleOutputCP(1251);
		cout << str;
	}
}
