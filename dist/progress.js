'use strict';
window.IC_PROGRESS = Object.freeze({
  blank() {
    return {schema: 1, course: 'ic-pathway', last: 'bits', lessons: {}, acceptance: {}};
  },
  normalize(raw, lessons, acceptanceCount) {
    if (!raw || raw.schema !== 1 || raw.course !== 'ic-pathway' ||
        !raw.lessons || typeof raw.lessons !== 'object') {
      throw new Error('This is not a progress file for this course');
    }
    const out = window.IC_PROGRESS.blank();
    if (lessons.some(lesson => lesson.id === raw.last)) out.last = raw.last;
    for (const lesson of lessons) {
      const value = raw.lessons[lesson.id];
      if (!value || typeof value !== 'object') continue;
      const draft = typeof value.draft === 'string' ? value.draft.slice(0, 15000) : '';
      const choice = Number.isInteger(value.choice) && value.choice >= 0 &&
        value.choice < lesson.quiz.options.length ? value.choice : null;
      const quizPassed = choice === lesson.quiz.correct && value.quizPassed === true;
      out.lessons[lesson.id] = {
        draft, choice, quizPassed,
        completed: value.completed === true && quizPassed && Boolean(draft.trim())
      };
    }
    for (let i = 0; i < acceptanceCount; i++) {
      out.acceptance[i] = raw.acceptance?.[i] === true;
    }
    return out;
  }
});
