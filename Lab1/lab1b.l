/*Lab program 1b- lex part to evaluate the expression*/
%{
	#include "lab1b.tab.h"
	extern int yylval;
%}
%{
	#include "lab1b.tab.h"
	extern int yylval;
%}
%%
[0-9]+ {yylval=atoi(yytext);return num;}
[\+\-\*\/] return yytext[0];
[)] return yytext[0];
[(] return yytext[0];
. ;
\n return 0;
%%