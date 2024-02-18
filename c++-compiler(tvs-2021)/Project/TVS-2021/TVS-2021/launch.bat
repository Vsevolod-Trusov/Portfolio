@echo off
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat" x86 
ml /c /coff /Zi Assembler.asm
link /OPT:NOREF /DEBUG /SUBSYSTEM:CONSOLE TVS-2021.obj
TVS-2021.exe
pause  
