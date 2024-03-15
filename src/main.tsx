import TopicMain from "@topic/main";
import { Match as TopicMatch } from "@topic/match";

console.log("Chaoxing auto start!!!");

if (TopicMatch()) {
  console.log("Topic Match");
  TopicMain();
}
