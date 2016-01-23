################################################################################
# 2012 Stop & Frisk Data Analysis
################################################################################

# Loading data from a file
# Option 1
sf = read.csv("~/Desktop/Dataviz Studio 1/R-basics/data/stop.csv")
# Option 2
setwd("~/Desktop/Dataviz Studio 1/R-basics/")
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
mf = gender == 1
boys = sf[mf,] #will only return TRUE results, in this case men

#shorthand for selecting a column
sf$sex

#include NA's
table(mf,useNA="always")
#2D matrix table
table(sf$sex,sf$eyecolor)

#plot / hist
plot(table(sf$age))
hist(sf$age)
hist(sf$age, breaks=20)

babies = sf[sf$age == 1,]
elderly = sf[sf$age >= 99,]
sum(sf$dob==12311900) #many default dates of birth
dobs = as.character(sf$dob)

#get the year out from the dob string using a conditional loop
#ifelse( condition, true result action, false result action )
year = ifelse( nchar(dobs)==7, substring(dobs,4), substring(dobs,5) )
year = as.numeric(year)
hist(2012-year-sf$age)

#add the year vector to the dataset
sf$yearob = year

#Reasonably smart way to get min max mean ...
summary(sf)

#A list can gold different data types





