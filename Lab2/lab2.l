/*lab program 2- Lex par to valuate a^nb.*/
%{
#include "lab2.tab.h"
%}
%%
a return A;
b return B;
. return yytext[0];
\n return 0;
%%
