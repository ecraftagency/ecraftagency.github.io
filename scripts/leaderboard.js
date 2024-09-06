var leaderboard_name = "TOPDIEMCAO";

function ReportScore(score)
{
  FBInstant
    .getLeaderboardAsync(leaderboard_name)
    .then(function(leaderboard){
      return leaderboard.setScoreAsync(score);
    });
}
function LoadRandomPlayer(callback)
{
  FBInstant
    .getLeaderboardAsync(leaderboard_name)
    .then(function(leaderboard){
          leaderboard.getEntriesAsync(100, 100)
          .then(function(entries){
              if(entries.length<20) return;
              callback(JSON.stringify(entries));
           });
    });
}
function LoadMyRank(callback)
{
  FBInstant
    .getLeaderboardAsync(leaderboard_name)
    .then(function(leaderboard){
          leaderboard.getPlayerEntryAsync()
          .then(function(entry){
                  console.log(JSON.stringify(entry));
                  callback(JSON.stringify(entry));

           });
    });
}
function LoadLeaderboard(callback)
{
  FBInstant
    .getLeaderboardAsync(leaderboard_name)
    .then(function(leaderboard){
          leaderboard.getEntriesAsync(100, 0)
          .then(function(entries){
              console.log(entries.length);
              callback(JSON.stringify(entries));
           });
    });
}
function LoadConnectedLeaderboard(callback)
{
  FBInstant
    .getLeaderboardAsync(leaderboard_name)
    .then(function(leaderboard) {
      return leaderboard.getConnectedPlayerEntriesAsync(100, 0);
    })
    .then(function(entries) {
        console.log("LeaderboardConnected entries ok "+ entries.length);
        callback(JSON.stringify(entries));
    });
}