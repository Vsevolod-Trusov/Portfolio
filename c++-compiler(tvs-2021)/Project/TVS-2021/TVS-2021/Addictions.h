#pragma once
#define _CRT_SECURE_NO_WARNINGS

#ifdef _DEBUG
#define _CRTDBG_MAP_ALLOC
#include <crtdbg.h>
#define DBG_NEW new ( _NORMAL_BLOCK , __FILE__ , __LINE__ )
#else
#define DBG_NEW new
#endif

#include<iostream>
#include<string>
#include <fstream>
#include "tchar.h"
#include <sstream>
#include <iomanip>
#include <fstream>
#include<stack>
#include <stdio.h>

using namespace std;

