#!/usr/bin/env node

const JiraApi = require('jira-client');

// Jira設定 - 環境変数から取得
const jira = new JiraApi({
  protocol: 'https',
  host: process.env.JIRA_HOST || 'your-domain.atlassian.net',
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_API_TOKEN,
  apiVersion: '2',
  strictSSL: true
});

async function createIssue() {
  try {
    const issue = {
      fields: {
        project: {
          key: process.env.JIRA_PROJECT_KEY || 'PROJ'
        },
        summary: 'コメント欄のスタイル調整',
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'React Native健康追跡アプリのコメント機能UIの改善が完了しました。'
                }
              ]
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [
                {
                  type: 'text',
                  text: '実装された改善点'
                }
              ]
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'コメント入力フィールドの現代的デザイン化（角丸12px、ソフトシャドウ、フォーカス時アニメーション）'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '文字カウンター表示の追加（500文字制限の視覚化）'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'ユーザーアバターの追加（ユーザーID末尾数字を使用）'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '健康状態の色分けバッジ化（良好=緑、普通=オレンジ、不調=赤）'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '体温表示に温度計アイコン追加で視認性向上'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'コメントカードデザインの洗練化（シャドウ、スペーシング改善）'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [
                {
                  type: 'text',
                  text: '技術詳細'
                }
              ]
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'ファイル: app/(tabs)/input/index.tsx（コメント入力画面）'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'ファイル: app/(tabs)/group/index.tsx（コメント表示画面）'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'React Native StyleSheet API使用'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'TypeScript対応'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [
                {
                  type: 'text',
                  text: 'テスト要件'
                }
              ]
            },
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'iOS/Androidでの表示確認'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'フォーカス時のアニメーション動作確認'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '文字数カウンター表示確認'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '健康状態バッジの色分け確認'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        issuetype: {
          name: 'Task'
        },
        assignee: {
          name: process.env.JIRA_ASSIGNEE || 'unassigned'
        },
        priority: {
          name: 'Medium'
        },
        labels: ['ui-improvement', 'react-native', 'health-app', 'completed']
      }
    };

    const createdIssue = await jira.addNewIssue(issue);
    console.log('✅ Jira課題が作成されました:');
    console.log(`   課題キー: ${createdIssue.key}`);
    console.log(`   URL: https://${process.env.JIRA_HOST}/browse/${createdIssue.key}`);
    
    return createdIssue;
  } catch (error) {
    console.error('❌ Jira課題の作成に失敗しました:', error.message);
    console.log('\n📋 手動でJiraに登録する場合の情報:');
    console.log('   タイトル: コメント欄のスタイル調整');
    console.log('   種類: Task');
    console.log('   優先度: Medium');
    console.log('   ラベル: ui-improvement, react-native, health-app, completed');
    throw error;
  }
}

// 環境変数の確認
if (!process.env.JIRA_HOST || !process.env.JIRA_USERNAME || !process.env.JIRA_API_TOKEN) {
  console.log('⚠️  Jira環境変数が設定されていません:');
  console.log('   JIRA_HOST=your-domain.atlassian.net');
  console.log('   JIRA_USERNAME=your-email@example.com');
  console.log('   JIRA_API_TOKEN=your-api-token');
  console.log('   JIRA_PROJECT_KEY=PROJ (オプション)');
  console.log('   JIRA_ASSIGNEE=your-username (オプション)');
  console.log('\n📋 手動登録用の課題情報を表示します...\n');
}

if (require.main === module) {
  createIssue().catch(() => process.exit(1));
}

module.exports = { createIssue };