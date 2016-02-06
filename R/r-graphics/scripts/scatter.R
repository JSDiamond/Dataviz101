# Scatterplot

install.packages("rgl")

# Basic scatterplot
# All dots sized/colored the same

library(ggplot2)
msa <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/msas-50-states.csv")

ggplot(msa, aes(x=STEM_Pay, y=All_Pay)) + 
  geom_point(size=6, color="red", alpha=0.5) + 
  geom_text(aes(label=MSA), size=2, vjust=-2) + 
  labs(x="STEM pay", 
       y="All non-STEM pay", title="STEM vs. non-STEM pay")

# Bubble plot
# Dots sized/colored to multiple variables

ggplot(msa, aes(x=STEM_Pay, y=All_Pay, size=Total_Employment, color=STEM_Pay_Multiple)) + 
  geom_point(alpha=0.5) + scale_size_area(max_size=15) + 
  scale_colour_gradientn(colours = c("red", "purple", "blue", "green")) + 
  geom_text(aes(label=MSA), color="black", size=2, vjust=-2) + 
  labs(x="STEM pay", y="All non-STEM pay", title="STEM vs. non-STEM pay")


# Concentric circles bubble plot
# Comparing variables to each other and showing their relationship to the whole

superheroes <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/superheroes-5.csv")

ggplot() + 
  geom_point(data= superheroes, aes(x=date, y=profit, size=gross), color="green", alpha=0.7) + 
  geom_point(data= superheroes, aes(x=date, y=profit, size=budget), color="darkred", alpha=1) + 
  scale_size_area(max_size=15) + 
  geom_text(data=superheroes, aes(x=date, y=profit+50, label=movie, color=studio), size=3) + 
  xlim(2004, 2014)


# Scatterplot matrix
# Visualizing pairwise relationships between select variables

#make a subset of the MSA data, using only select columns
msas2 <- subset(msa, select=c(MSA, Total_Employment, STEM_Employment, Non.STEM_Employment, STEM_Pay, All_Pay, STEM_Employment_percent, STEM_Pay_Multiple))

plot(msas2)

# Creating a subset from a continuous range of columns or rows

#selects all rows and columns 5 to 8
pairs(msa[,5:8])
