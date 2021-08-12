/* Lab program 2- yacc part to evaluate a^nb*/
%{
#include<stdio.h>
#include<stdlib.h>
int yyerror();
int yylex();
int n,c;
%}
%token A B
%%
s: X B;
X:X A{c++}|;
%%
int yyerror()
{

	printf("Invalid String");
	exit(0);
}
int yywrap()
{
	return 0;
}
void  main()
{
printf("Enter n Value\n");
scanf("%d",&n);
fflush(stdin);
printf("Enter the String of the form a^n*b\n");
yyparse();
if(c==n)
	printf("Valid String");
else
	
	printf("Invalid String");
}