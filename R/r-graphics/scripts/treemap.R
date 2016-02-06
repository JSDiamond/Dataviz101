# Treemap


# Basic treemap
# Sized and colored by different variables, no grouping

install.packages("portfolio")
library(portfolio)

candidates <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/candidates.csv")
View(candidates)

# sized by contribution amount, grouped by individual ID, colored by party
map.market(id=candidates$amount, area=candidates$amount, group=candidates$candidate, color=candidates$party, lab = c(TRUE, TRUE), main="Campaign contributions")


# Grouped treemap
# Using treemap library, controling color palette, grouped by data category

install.packages("data.table")
library(data.table)
install.packages("treemap")
library(treemap)
install.packages("RColorBrewer")
library(RColorBrewer)

stem <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/STEM_employment-totals.csv")
View(stem)

# sized by total employment, grouped by 4 different occupation types, colored by wage
# treemap(id=stem$occupation, area=stem$employment, group=stem$type, color=stem$wage, lab = c(TRUE, TRUE), main="STEM employment totals", pal="Oranges", linecol="white", textcol="white")
# The treemap function above did not work for me, below is a similar concept
# http://artax.karlin.mff.cuni.cz/r-help/library/treemap/html/tmPlot.html

tmPlot(stem, index=c("type", "occupation"), vSize="employment", vColor="wage", type="value", pal="Oranges") 
        
        