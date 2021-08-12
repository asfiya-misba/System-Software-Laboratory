%{
#include<stdio.h>
int sl=0,ml=0;
%}
%x CMNTSL CMNTML
%%
"/*" {BEGIN CMNTML; ml++;}
<CMNTML>. ;
<CMNTML>\n ;
<CMNTML>"*/" {BEGIN O;}
"//" {BEGIN CMNTSL; sl++;}
<CMNTSL>. ;
<CMNTSL>\n {BEGIN O;}
%%
int main(int argc, char **argv)
{
if(argc!=3)
{
    printf("Invalid no. of arguments\n");
    return 0;
}
yyin=fopen(argv[1],"r");
yyout=fopen(argv[2],"w");
yylex(); 
fclose(yyin);
fclose(yyout);
printf("\n Number of single line comments are = %d\n",sl);
printf("\nNumber of multiline comments are =%d\n",ml);
}
