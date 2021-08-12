/*Lab program-1b yacc part to evaluate arthmetic expression*/%{
	#include<stdio.h>
	#include<stdlib.h>
	int yylex();
	int yyerror();
%}
%left '+' '-'
%left '*' '/'
%token num
%%
input:exp {printf("%d\n",$$);exit(0);}
exp:exp'+'exp {$$=$1+$3;}
   |exp'-'exp {$$=$1-$3;}
   |exp'*'exp {$$=$1*$3;}
   |exp'/'exp {if($3==0) {printf("Divide by zero error\n");exit(0);} else $$=$1/$3;}
   |'('exp')' {$$=$2;}
   |num {$$=$1;}
   ;
%%
int yyerror()
{
	printf("Error");
	exit(0);
}
int yywrap()
{
	return 0;
}
int main()
{
	printf("Enter the arithmetic expression\n");
	yyparse();
}