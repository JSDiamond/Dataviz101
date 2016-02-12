# Rotating x-axis text

# vector of month names from built-in month.name object
labels <- month.name[1:12]
# barplot of all 12 months
mp <- barplot(1:12, axes = FALSE, axisnames = FALSE)
# alter text and rotate based on srt value
text(mp, par('usr')[3], labels = labels, srt = 90, adj = c(1.1,0.5), xpd = TRUE, cex=.9)
axis(2)
     
# Now with ggplot
library(ggplot2)

# new dataset
data(diamonds)
# extend the cut names with "Extra long name - "
diamonds$cut <- paste("Extra long name - ", as.character(diamonds$cut))

# make a bar graph and rotate the a-axis text based on angle value
p = qplot(cut, data=diamonds, geom="bar")
p + theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1))

# crazy boxplot
q = qplot(cut,carat,data=diamonds,geom="boxplot")
q + theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust=1))


# stacked bar
a = c(1,1,1,1,1,1,1,2,2,2,2,2,2,2)
b = c("A","A","A","B","D","B","B","C","C","D","A","A","D","D")
c = c(60,20,20,80,5,5,5,50,50,25,25,25,20,5)
dat = data.frame(Group=a, Member=b, Percentage=c)
ggplot(dat, aes(x=Group, y=Percentage, fill=Member)) + geom_bar(stat="identity", colour="white")+
  theme(axis.text.x=element_text(angle=90,hjust=1,vjust=0.5))
