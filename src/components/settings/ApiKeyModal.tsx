'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, AlertTriangle, ExternalLink, Settings } from 'lucide-react';
import { AIProvider } from '@/types';

export function ApiKeyModal() {
  const { settings, updateSettings, _hasHydrated, isSettingsOpen, setSettingsOpen } = useAppStore();
  const [claudeKey, setClaudeKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [activeTab, setActiveTab] = useState<AIProvider>('claude');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  // ストアの値で初期化
  useEffect(() => {
    if (_hasHydrated) {
      setClaudeKey(settings.claudeApiKey || '');
      setGeminiKey(settings.geminiApiKey || '');
      setActiveTab(settings.provider || 'claude');
    }
  }, [_hasHydrated, settings, isSettingsOpen]);

  // プロバイダーに応じたキーが未設定の場合、またはユーザーが設定を開いた場合に表示
  const startOpen = _hasHydrated && (
    (settings.provider === 'claude' && !settings.claudeApiKey) ||
    (settings.provider === 'gemini' && !settings.geminiApiKey)
  );

  const isOpen = isSettingsOpen || startOpen;

  const handleOpenChange = (open: boolean) => {
    setSettingsOpen(open);
  };

  // Headerに配置するためのトリガーを表示するかどうか
  const [useTrigger, setUseTrigger] = useState(false);
  useEffect(() => {
    // マウント後にトリガー使用判定（props等で制御しても良いが、今回は簡易的に）
    setUseTrigger(true);
  }, []);

  const handleSave = () => {
    setError('');

    // 現在選択されているタブのバリデーション
    if (activeTab === 'claude') {
      if (!claudeKey.trim()) {
        setError('Claude APIキーを入力してください');
        return;
      }
      if (!claudeKey.startsWith('sk-ant-')) {
        setError('有効なClaude APIキーを入力してください（sk-ant-で始まる）');
        return;
      }
    } else if (activeTab === 'gemini') {
      if (!geminiKey.trim()) {
        setError('Gemini APIキーを入力してください');
        return;
      }
      // Geminiキーの形式チェックは緩めに（特定のプレフィックスがない場合もあるため）
    }

    updateSettings({
      provider: activeTab,
      claudeApiKey: claudeKey,
      geminiApiKey: geminiKey,
      useServiceKey: false
    });
    setSettingsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {useTrigger && (
        <div onClick={() => setSettingsOpen(true)} className="cursor-pointer p-2 hover:bg-muted rounded-md transition-colors" title="設定">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={(e) => {
          // キー未設定時は閉じられないようにする（設定ボタンから開いた場合は閉じられる）
          if (startOpen && !isSettingsOpen) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (startOpen && !isSettingsOpen) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            AI設定
          </DialogTitle>
          <DialogDescription>
            使用するAIモデルとAPIキーを設定してください
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AIProvider)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="claude">Claude (Anthropic)</TabsTrigger>
              <TabsTrigger value="gemini">Gemini (Google)</TabsTrigger>
            </TabsList>

            <TabsContent value="claude" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Claude API Key</label>
                <div className="flex gap-2">
                  <Input
                    type={showKey ? 'text' : 'password'}
                    value={claudeKey}
                    onChange={(e) => {
                      setClaudeKey(e.target.value);
                      setError('');
                    }}
                    placeholder="sk-ant-api03-..."
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowKey(!showKey)}
                    type="button"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  モデル: Claude 3.5 Opus (claude-opus-4-5-20251101) ※仮定
                </div>
              </div>

              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                Claude APIキーを取得する
              </a>
            </TabsContent>

            <TabsContent value="gemini" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Gemini API Key</label>
                <div className="flex gap-2">
                  <Input
                    type={showKey ? 'text' : 'password'}
                    value={geminiKey}
                    onChange={(e) => {
                      setGeminiKey(e.target.value);
                      setError('');
                    }}
                    placeholder="AIza..."
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowKey(!showKey)}
                    type="button"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  モデル: Gemini 3 Pro Preview (gemini-3-pro-preview)
                </div>
              </div>

              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <ExternalLink className="w-3 h-3" />
                Gemini APIキーを取得する
              </a>
            </TabsContent>
          </Tabs>

          {error && <p className="text-sm text-destructive mt-4">{error}</p>}

          <div className="mt-6 flex items-start gap-2 p-3 bg-muted rounded-lg">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>セキュリティについて:</strong></p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>APIキーはこのブラウザにのみ保存されます</li>
                <li>サーバーには送信されません</li>
              </ul>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full mt-4">
            保存して適用
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
