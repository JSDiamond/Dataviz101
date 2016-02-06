# Basic slope chart
# Shows distribution of data within each column (along y-axis)

library(ggplot2)
wantFind <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/want-find-test.csv")

ggplot(wantFind) + geom_segment(aes(x=10, xend=40, y=most_important, yend=hardest_to_find), color="red", alpha=0.5) + 
  xlim(0, 50) + ylim(0, 100) + 
  geom_text(aes(x=8.6, y=most_important, label=skill), alpha=0.6, size=4, hjust=1) + 
  geom_text(aes(x=9.8, y=most_important, label=most_important), size=4, hjust=1) + 
  geom_text(aes(x=40.2, y=hardest_to_find, label=hardest_to_find), size=4, hjust=0) + 
  geom_text(aes(x=42, y=hardest_to_find, label=skill), alpha=0.6, size=4, hjust=0) + 
  ggtitle("Skills wanted/hardest to find: Finance sector") + 
  annotate("text", x=9.8, y=90, label="Most important skills sought", size=5, hjust=1) + 
  annotate("text", x=40.2, y=90, label="Hardest-to-find skills", size=5, hjust=0)


# Ranked slope chart
# Even distribution of data along y-axis

col <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/COL-4.csv")

p <- ggplot(col) + geom_point(aes(x=25, y=STEM_pay), color="red", size=1) + 
  geom_point(aes(x=75, y=COL), color="red", size=1) + xlim(15,85) + 
  geom_segment(aes(x=25, xend=75, y=STEM_pay, yend=COL), color="red", alpha=0.5) + 
  scale_y_reverse()

p + geom_text(aes(x=23.5, y=STEM_pay, label=City), size=2, hjust=1) + 
  geom_text(aes(x=24.5, y=STEM_pay, label=STEM_pay), size=2, hjust=1) + 
  geom_text(aes(x=75.5, y=COL, label=COL), size=2, hjust=0) + 
  geom_text(aes(x=76.5, y=COL, label=City), size=2, hjust=0) + 
  annotate("text", x=24.5, y=-2, label="STEM pay rank", size=3, hjust=1) + 
  annotate("text", x=75.5, y=-2, label="Cost of living rank", size=3, hjust=0)


# Multi-column rankings chart
# Sharp corners with dots

ranks <- read.csv("~/Desktop/Dataviz101/R/r-graphics/csv/ranks-ft.csv")
View(ranks)

p <- ggplot(ranks) + geom_point(aes(x=20, y=rank2015), color="red", size=1) + 
  geom_point(aes(x=40, y=student), color="red", size=1) +
  geom_point(aes(x=60, y=alumni), color="red", size=1) +
  geom_point(aes(x=80, y=employer), color="red", size=1) +
  geom_point(aes(x=100, y=placement), color="red", size=1) +
  geom_point(aes(x=120, y=salary), color="red", size=1) + 
  xlim(-5,140) + 
  geom_segment(aes(x=20, xend=40, y=rank2015, yend=student), color="red", alpha=0.5) + 
  geom_segment(aes(x=40, xend=60, y=student, yend=alumni), color="red", alpha=0.5) + 
  geom_segment(aes(x=60, xend=80, y=alumni, yend=employer), color="red", alpha=0.5) + 
  geom_segment(aes(x=80, xend=100, y=employer, yend=placement), color="red", alpha=0.5) + 
  geom_segment(aes(x=100, xend=120, y=placement, yend=salary), color="red", alpha=0.5) + 
  scale_y_reverse()

p + geom_text(aes(x=17.5, y=rank2015, label=school), size=2, hjust=1) + 
  geom_text(aes(x=19.5, y=rank2015, label= rank2015), size=2, hjust=1) + 
  geom_text(aes(x=120.5, y=salary, label=salary), size=2, hjust=0) + 
  geom_text(aes(x=122.5, y=salary, label=school), size=2, hjust=0) + 
  annotate("text", x=19.5, y=-2, label="Overall rank", size=3, hjust=1) + 
  annotate("text", x=40, y=-2, label="Student rank", size=3) + 
  annotate("text", x=60, y=-2, label="Alumni rank", size=3) + 
  annotate("text", x=80, y=-2, label="Employer rank", size=3) + 
  annotate("text", x=100, y=-2, label="Placement rank", size=3) + 
  annotate("text", x=120.5, y=-2, label="Salary rank", size=3, hjust=0)


# Multi-column rankings chart 2
# With plateaus, no dots

p <- ggplot(ranks) +
  xlim(-5,140) + 
  geom_segment(aes(x=15, xend=20, y=rank2015, yend=rank2015), color="red", alpha=0.5) +
  geom_segment(aes(x=20, xend=35, y=rank2015, yend=student), color="red", alpha=0.5) + 
  geom_segment(aes(x=35, xend=40, y=student, yend=student), color="red", alpha=0.5) + 
  geom_segment(aes(x=40, xend=55, y=student, yend=alumni), color="red", alpha=0.5) + 
  geom_segment(aes(x=55, xend=60, y=alumni, yend=alumni), color="red", alpha=0.5) + 
  geom_segment(aes(x=60, xend=75, y=alumni, yend=employer), color="red", alpha=0.5) + 
  geom_segment(aes(x=75, xend=80, y=employer, yend=employer), color="red", alpha=0.5) + 
  geom_segment(aes(x=80, xend=95, y=employer, yend=placement), color="red", alpha=0.5) + 
  geom_segment(aes(x=95, xend=100, y=placement, yend=placement), color="red", alpha=0.5) + 
  geom_segment(aes(x=100, xend=115, y=placement, yend=salary), color="red", alpha=0.5) + 
  geom_segment(aes(x=115, xend=120, y=salary, yend=salary), color="red", alpha=0.5) + 
  scale_y_reverse()

p + geom_text(aes(x=12, y=rank2015, label=school), size=2, hjust=1) + 
  geom_text(aes(x=14, y=rank2015, label= rank2015), size=2, hjust=1) + 
  geom_text(aes(x=121, y=salary, label=salary), size=2, hjust=0) + 
  geom_text(aes(x=123, y=salary, label=school), size=2, hjust=0) + 
  annotate("text", x=17.5, y=-2, label="Overall rank", size=3) + 
  annotate("text", x=37.5, y=-2, label="Student rank", size=3) + 
  annotate("text", x=57.5, y=-2, label="Alumni rank", size=3) + 
  annotate("text", x=77.5, y=-2, label="Employer rank", size=3) + 
  annotate("text", x=97.5, y=-2, label="Placement rank", size=3) + 
  annotate("text", x=117.5, y=-2, label="Salary rank", size=3)
