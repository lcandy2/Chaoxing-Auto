import { Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <Typography variant="body1" gutterBottom>
        本脚本用于自动化学习通讨论区的评论操作。
      </Typography>
      <Typography variant="body2" gutterBottom>
        作者：
        <a href="http://github.com/lcandy2" target="_blank">
          @lcandy2
        </a>
      </Typography>
    </>
  );
}
