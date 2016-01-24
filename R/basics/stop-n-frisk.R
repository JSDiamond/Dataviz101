################################################################################
# 2012 Stop & Frisk Data Analysis, via Mark Hansen @cocteau
################################################################################

# Loading data from a file
# Option 1
sf = read.csv("~/Desktop/Dataviz101/R/basics/data/stop.csv")
# Option 2
setwd("~/Desktop/Dataviz101/R/basics/")
sf = read.csv("data/stop.csv")
# Option 3: From the web
sf = read.csv("http://compute-cuj.org/dm/stop.csv")

# If you want to clear environtment of values and data
rm(list=ls())

View(sf)
tail(sf)
#vector, aka list or array, of top row of the csv
n = names(sf)
#outputs [1] "character" aka string
class(n)
n[1:10]

#pull from data ["rows","columns"]
gender = sf[,"sex"]
#empty means keep all
#[1:5] means create a vector of 1 through 5
#INDEX: you can concat rows like sf[c(1,2,3:10,20),"sex"]
sarah = sf[,c("sex", "city")]
#EXCLUSION: sf[-1:5,"dob"] -range means leave out this range
table(sf[,"sex"]) #will output a count of the resulting values
#LOGICALMASK: sf[,"sex"]
gender == 1 #outputs TRUE or FALSE for each item in the vector
mf = gender == 1 # test for males
boys = sf[mf,] #will only return TRUE results, in this case men

#shorthand for selecting a column
sf$sex

#include NA's
table(mf,useNA="always")
#2D matrix table
table(sf$sex, sf$eyecolor)
table(sf$crimsusp, sf$sex)

#plot / hist
plot(table(sf$age))
table(sf$age) # more stange data entry errors
hist(sf$age)
hist(sf$age, breaks=20) # breaks defaults to 10

babies = sf[sf$age == 1,]
elderly = sf[sf$age >= 99,]
sum(sf$dob==12311900) #many default dates of birth 12/31/1900
dobs = as.character(sf$dob)

#get the year out from the dob string using a conditional loop
#ifelse( condition, true result action, false result action )
year = ifelse( nchar(dobs)==7, substring(dobs,4), substring(dobs,5) )

help('ifelse')
ifelse( c(0:10)==3, TRUE, FALSE )
nchar('tenletters')
nchar(dobs)

year = as.numeric(year)

# (s&f year) - (dob year) - (recorded age) should = 0
hist(2012 - year - sf$age)


age.columns = cbind( (2012 - year) , sf$age)
help('cbind')
age.columns
# A scatter plot of calculated age vs recorded age should be a direct relationship
plot( age.columns )

matching.age = ifelse( age.columns[,1] == age.columns[,2], 0 , 1 )
# Number of matching ages
sum(matching.age==1)
# Number of mismatched ages
sum(matching.age==0)

#add the year vector to the dataset
sf$yearob = year

#Reasonably smart way to get min max mean ...
summary(sf)


# Creating a PDF of you graphic(s)
# Begin output to a pdf file
# File size is in inches, 6in. x 6in.
pdf("stop-n-frisk-1.pdf", family = "Helvetica", width = 6, height = 6)

hist(sf$age, breaks=20)
plot( age.columns )

# End output to the pdf
dev.off()


