# User Guide

## Quick Start

1. **Open the app** at http://localhost:3002 (or your deployment URL)
2. **Add participants** by clicking "Adicionar participantes"
3. **Draw winners** using the draw buttons
4. **View history** on the right panel

---

## Step-by-Step Guide

### 1. Adding Participants

Click the **"Adicionar participantes"** button to open the modal.

Enter participant names, **one per line**:
```
João Silva
Maria Santos
Pedro Oliveira
Ana Costa
```

Click **"Adicionar"** to save.

### 2. Drawing One Participant

Click **"Sortear um"** to draw a single participant.

- ⏳ A spinner animation appears for 2 seconds
- 🎉 A modal shows the winner
- ✅ The winner is moved to history
- 🗑️ The winner is removed from the participants list

### 3. Drawing All Participants

Click **"Sortear todos"** to draw everyone at once.

- 🔀 All participants are instantly shuffled
- 📋 The complete draw order appears in history
- 🏁 The participants list becomes empty

### 4. Viewing History

The **Draw History** panel shows:
- Position number (1°, 2°, 3°, etc.)
- Participant name
- Complete chronological order

Example:
```
1° João Silva
2° Maria Santos
3° Pedro Oliveira
```

### 5. Resetting the Raffle

Click **"Reiniciar sorteio"** to:
- Clear all participants
- Clear draw history
- Start fresh

⚠️ **Warning**: This action cannot be undone! A confirmation dialog will appear.

---

## Features Guide

### Theme Switching

Click the **moon/sun icon** in the header to toggle between:
- 🌙 Dark mode
- ☀️ Light mode

Your preference is saved automatically.

### Language Selection

Use the dropdown menu to switch between:
- 🇧🇷 Português (Brasil)
- 🇺🇸 English

Your choice persists across sessions.

---

## Tips & Tricks

### Best Practices

1. **Add all participants before drawing**: You can add more later, but it's easier to add everyone at once.

2. **Use meaningful names**: Make sure names are clear and unambiguous.

3. **Check the count**: The participant count shows how many are remaining.

4. **Review history**: Always check the history panel to verify the draw order.

### Common Questions

**Q: Can I undo a draw?**
A: No, draws are final. You'll need to reset and start over.

**Q: Is my data safe?**
A: Yes! All data is stored locally in your browser (IndexedDB). No data is sent to any server.

**Q: Can I use this on mobile?**
A: Absolutely! The app is fully responsive and works great on phones and tablets.

**Q: What happens if I close the browser?**
A: Your data persists! When you return, all participants and history will still be there.

**Q: Can I export the results?**
A: Currently, you can manually copy from the history panel. Export feature may be added in future versions.

**Q: How many participants can I add?**
A: Thousands! IndexedDB can handle very large datasets.

**Q: Does it work offline?**
A: Yes! After the initial load, the app works completely offline.

---

## Keyboard Shortcuts

- `Tab`: Navigate between elements
- `Enter`: Confirm actions in modals
- `Escape`: Close modals

---

## Troubleshooting

### Problem: Participants won't add
- **Solution**: Make sure you entered at least one name
- Check that each name is on a separate line

### Problem: Draw button is disabled
- **Solution**: You need at least one participant to draw
- Make sure no draw is currently in progress

### Problem: Theme doesn't switch
- **Solution**: Wait a moment for the page to fully load
- Try refreshing the browser

### Problem: Language doesn't change
- **Solution**: The language selector updates immediately
- If not, check browser console for errors

### Problem: Data disappeared
- **Solution**: Check if you accidentally hit "Reset"
- IndexedDB data is browser-specific (different browsers = different storage)

---

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome 90+ | ✅ Full support | Recommended |
| Firefox 88+ | ✅ Full support | Recommended |
| Safari 14+ | ✅ Full support | Works great |
| Edge 90+ | ✅ Full support | Recommended |
| Mobile Safari | ✅ Full support | iOS 14+ |
| Chrome Mobile | ✅ Full support | Android 5+ |

---

## Advanced Usage

### Multiple Raffles

To run multiple independent raffles:
1. Use different browser profiles, OR
2. Use incognito/private windows, OR
3. Use different browsers

Each has its own separate IndexedDB storage.

### Data Backup

To backup your data:
1. Open browser DevTools (F12)
2. Go to Application → IndexedDB → raffle-draw-db
3. Export the data manually

(Note: A built-in export feature may be added in future versions)

---

## Need Help?

If you encounter issues:
1. Check this guide
2. Look at the troubleshooting section
3. Check browser console for errors (F12)
4. Open an issue on GitHub

---

Enjoy using the Raffle Draw App! 🎉
