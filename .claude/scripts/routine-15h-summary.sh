#!/bin/bash
# Routine 15H chiều: Tóm tắt thay đổi trong ngày
# Chạy bởi Claude Code Routine tự động

PROJECT_DIR="/home/user/silicone-gasket-quote"
REPORT_DIR="$PROJECT_DIR/.claude/reports"
DATE=$(date +%Y-%m-%d)
REPORT_FILE="$REPORT_DIR/summary-$DATE.md"

mkdir -p "$REPORT_DIR"

cd "$PROJECT_DIR"

echo "# 📊 Báo Cáo Thay Đổi Hàng Ngày" > "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "**Ngày:** $DATE | **Thời gian tạo:** $(date +%H:%M)" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "## 📝 Git Status" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"
git status >> "$REPORT_FILE" 2>&1
echo '```' >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "## 📜 Commit Hôm Nay" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"
git log --since="$DATE 00:00" --until="$DATE 23:59" --pretty=format:"%h %ai %s" >> "$REPORT_FILE" 2>&1 || echo "Chưa có commit nào hôm nay" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "## 📁 Files Thay Đổi (Chưa Commit)" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"
git diff --name-status >> "$REPORT_FILE" 2>&1 || echo "Không có file thay đổi" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

echo "## 📦 Cấu Trúc Dự Án" >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"
find . -type f \( -name "*.ts" -o -name "*.tsx" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.next/*" \
  | sort >> "$REPORT_FILE"
echo '```' >> "$REPORT_FILE"

echo "" >> "$REPORT_FILE"
echo "---" >> "$REPORT_FILE"
echo "*Report tự động tạo bởi Claude Code Routine lúc 15H*" >> "$REPORT_FILE"

cat "$REPORT_FILE"
echo ""
echo "✅ Summary report đã lưu tại: $REPORT_FILE"
