.586
.model flat, stdcall
includelib libucrt.lib
includelib kernel32.lib
includelib msvcrt.lib
includelib Iphlpapi.lib
includelib ../Debug/TVS-2021_Lib.lib
ExitProcess PROTO :DWORD

 Compare	 proto :DWORD,: DWORD
 StrLength	 proto :DWORD
 Convert	 proto :DWORD
 OutVShortL	 proto :SWORD
 OutVShort	 proto :SWORD
 OutStringL	 proto :DWORD
 OutString	 proto :DWORD
 OutBooleanL proto :SWORD

 OutBoolean	 proto :SWORD


.stack 4096

.const
	L0 SWORD 1
	L1 SWORD 0
	L2 BYTE "Первые 10 нечетных чисел, начиная с 1: ", 0
	L3 SWORD 10
	L4 SWORD 2
	L5 BYTE " ", 0
	L6 SWORD 3
	L7 BYTE "Яблоко", 0
	L8 BYTE "Банан", 0
	L9 BYTE "Количество яблок: ", 0
	L10 BYTE "Количество бананов: ", 0
	L11 BYTE "Длина слова 'Яблоко': ", 0
	L12 BYTE "Длина слова 'Банан': ", 0
	L13 SWORD 7
	L14 BYTE "Факториал 7: ", 0

.data
	buffer BYTE 256 dup(0)
	factorialj SWORD 0
	factorialresult SWORD 0
	Programnumber SWORD 0
	Programremainder SWORD 0
	Programcounter1 SWORD 0
	Fruit1 DWORD ?
	Fruit2 DWORD ?
	Fruit3 DWORD ?
	counter_apples SWORD 0
	counter_bananas SWORD 0
	StrLengthnumber2 SWORD 0

.code


factorial PROC factorialparameter: SWORD

	push		L0
	pop			factorialj

	push		L0
	pop			factorialresult


ROUND5 :
	push		factorialj
	push		factorialparameter
	pop		bx
	pop		ax
	cmp		ax, bx
	ja		ROUNDOUT5
	push		factorialresult
	push		factorialj

	pop		ax
	pop		bx
	cwd
	imul		bx
	push		ax

	pop			factorialresult

	push		factorialj
	push		L0

	pop		ax
	pop		bx
	cwd
	add		ax, bx
	push		ax

	pop			factorialj

	jmp		ROUND5
	ROUNDOUT5:
	mov		ax, factorialresult
	ret		4


factorial ENDP

main PROC
	push		L0
	pop			Programnumber

	push		L1
	pop			Programremainder

	push		L1
	pop			Programcounter1

	push		offset L2
	call		OutStringL


ROUND20 :
	push		Programcounter1
	push		L3
	pop		bx
	pop		ax
	cmp		ax, bx
	ja		ROUNDOUT20
	push		Programnumber
	push		L4

	pop		bx
	pop		ax
	cwd
	idiv		bx
	push		dx

	pop			Programremainder

	push		Programremainder
	push		L0
	pop		bx
	pop		ax
	cmp		ax, bx
	jne		FALSE23
	push		Programnumber
	call		OutVShort

	push		offset L5
	call		OutString

	push		Programcounter1
	push		L0

	pop		ax
	pop		bx
	cwd
	add		ax, bx
	push		ax

	pop			Programcounter1

FALSE23: 
	push		Programnumber
	push		L0

	pop		ax
	pop		bx
	cwd
	add		ax, bx
	push		ax

	pop			Programnumber

	jmp		ROUND20
	ROUNDOUT20:
	push		offset L5
	call		OutStringL

	push		L0
	pop		ax
	neg		ax
	push		ax

	call		OutVShort

	push		offset L5
	call		OutString

	push		L4
	pop		ax
	neg		ax
	push		ax

	call		OutVShort

	push		offset L5
	call		OutString

	push		L6
	pop		ax
	neg		ax
	push		ax

	call		OutVShort

	push		offset L5
	call		OutStringL

	push		offset L7
	pop			Fruit1

	push		offset L8
	pop			Fruit2

	push		offset L7
	pop			Fruit3

	push		L1
	pop			counter_apples

	push		L1
	pop			counter_bananas

	push	 Fruit1
	push		offset L7
	call		Compare
	push		ax
	pop		ax
	mov		bx, 0
	cmp		ax, bx
	jz		FALSE46
	push		counter_apples
	push		L0

	pop		ax
	pop		bx
	cwd
	add		ax, bx
	push		ax

	pop			counter_apples

FALSE46: 
	push	 Fruit2
	push		offset L7
	call		Compare
	push		ax
	pop		ax
	mov		bx, 0
	cmp		ax, bx
	jz		FALSE50
	push		counter_apples
	push		L0

	pop		ax
	pop		bx
	cwd
	add		ax, bx
	push		ax

	pop			counter_apples

FALSE50: 
	push	 Fruit3
	push		offset L7
	call		Compare
	push		ax
	pop		ax
	mov		bx, 0
	cmp		ax, bx
	jz		FALSE54
	push		counter_apples
	push		L0

	pop		ax
	pop		bx
	cwd
	add		ax, bx
	push		ax

	pop			counter_apples

FALSE54: 
	push	 Fruit1
	push		offset L8
	call		Compare
	push		ax
	pop		ax
	mov		bx, 0
	cmp		ax, bx
	jz		FALSE58
	push		counter_bananas
	push		L0

	pop		ax
	pop		bx
	cwd
	add		ax, bx
	push		ax

	pop			counter_bananas

FALSE58: 
	push	 Fruit2
	push		offset L8
	call		Compare
	push		ax
	pop		ax
	mov		bx, 0
	cmp		ax, bx
	jz		FALSE62
	push		counter_bananas
	push		L0

	pop		ax
	pop		bx
	cwd
	add		ax, bx
	push		ax

	pop			counter_bananas

FALSE62: 
	push	 Fruit3
	push		offset L8
	call		Compare
	push		ax
	pop		ax
	mov		bx, 0
	cmp		ax, bx
	jz		FALSE66
	push		counter_bananas
	push		L0

	pop		ax
	pop		bx
	cwd
	add		ax, bx
	push		ax

	pop			counter_bananas

FALSE66: 
	push		offset L9
	call		OutString

	push		counter_apples
	call		OutVShortL

	push		offset L10
	call		OutString

	push		counter_bananas
	call		OutVShortL

	push		counter_apples
	push		counter_bananas
	pop		bx
	pop		ax
	cmp		ax, bx
	jl		FALSE76
	je		FALSE76
	jg		TRUE76
TRUE76: 
	push		offset L11
	call		OutString

	push		offset L7
	call		StrLength
	push		ax

	call		OutVShortL

	jmp		IFOUT76
FALSE76: 
	push		offset L12
	call		OutString

	push	 Fruit2
	call		StrLength
	push		ax

	call		OutVShortL

IFOUT76: 
	push		L13
	pop			StrLengthnumber2

	movsx	eax, StrLengthnumber2
	push eax
	call		factorial
	push		ax
	pop			StrLengthnumber2

	push		offset L14
	call		OutString

	push		StrLengthnumber2
	call		OutVShortL


	push		0
	call		ExitProcess
main ENDP



END main
